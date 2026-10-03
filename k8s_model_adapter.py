from kubernetes import client, config


def parse_cpu(cpu_value):
    """
    Convert Kubernetes CPU quantity to CPU cores.

    Kubernetes may report CPU as:
        8          -> 8 cores
        500m       -> 0.5 cores
        290488011n -> 0.290488011 cores
    """

    cpu_value = str(cpu_value).strip()

    if cpu_value.endswith("n"):
        return float(cpu_value[:-1]) / 1_000_000_000

    if cpu_value.endswith("u"):
        return float(cpu_value[:-1]) / 1_000_000

    if cpu_value.endswith("m"):
        return float(cpu_value[:-1]) / 1000

    return float(cpu_value)


def parse_memory(memory_value):
    """Convert Kubernetes memory quantity to GiB."""

    memory_value = str(memory_value)

    if memory_value.endswith("Ki"):
        return float(memory_value[:-2]) / (1024 ** 2)

    if memory_value.endswith("Mi"):
        return float(memory_value[:-2]) / 1024

    if memory_value.endswith("Gi"):
        return float(memory_value[:-2])

    if memory_value.endswith("Ti"):
        return float(memory_value[:-2]) * 1024

    return float(memory_value) / (1024 ** 3)


def get_node_features():
    """
    Collect real Kubernetes node state and convert it
    into the feature format expected by the AI scheduler.
    """

    config.load_kube_config()

    core_api = client.CoreV1Api()
    custom_api = client.CustomObjectsApi()

    # Get node definitions.
    nodes = core_api.list_node().items

    # Get live CPU/memory metrics.
    metrics = custom_api.list_cluster_custom_object(
        group="metrics.k8s.io",
        version="v1beta1",
        plural="nodes"
    )

    metrics_by_node = {
        item["metadata"]["name"]: item
        for item in metrics["items"]
    }

    result = []

    for node in nodes:

        node_name = node.metadata.name

        capacity = node.status.capacity or {}

        cpu_capacity = parse_cpu(
            capacity.get("cpu", "0")
        )

        memory_capacity = parse_memory(
            capacity.get("memory", "0")
        )

        # Find live metrics for this node.
        node_metric = metrics_by_node.get(node_name)

        if node_metric is None:
            print(
                f"Warning: no metrics available for {node_name}"
            )
            continue

        usage = node_metric.get("usage", {})

        cpu_usage = parse_cpu(
            usage.get("cpu", "0")
        )

        memory_usage = parse_memory(
            usage.get("memory", "0")
        )

        # Convert actual usage into percentages.
        cpu_utilization_pct = (
            cpu_usage / cpu_capacity
        ) * 100 if cpu_capacity else 0

        memory_utilization_pct = (
            memory_usage / memory_capacity
        ) * 100 if memory_capacity else 0

        # Count running pods on this node.
        pods = core_api.list_pod_for_all_namespaces(
            field_selector=f"spec.nodeName={node_name}"
        ).items

        running_pods = sum(
            1
            for pod in pods
            if pod.status.phase == "Running"
        )

        taints = node.spec.taints or []

        has_no_schedule_taint = any(
            taint.effect == "NoSchedule"
            for taint in taints)

        result.append({
            "node_id": node_name,
            "cpu_capacity_cores": cpu_capacity,
            "memory_capacity_gb": memory_capacity,
            "cpu_utilization_pct": cpu_utilization_pct,
            "memory_utilization_pct": memory_utilization_pct,
            "running_pods": running_pods,
            "schedulable": not has_no_schedule_taint,
        })
    return result


if __name__ == "__main__":

    nodes = get_node_features()

    print("\n" + "=" * 75)
    print("       KUBERNETES → AI SCHEDULER FEATURE ADAPTER")
    print("=" * 75)

    for node in nodes:

        print(f"\nNode: {node['node_id']}")

        print(
            f"CPU Capacity       : "
            f"{node['cpu_capacity_cores']:.2f} cores"
        )

        print(
            f"CPU Utilization    : "
            f"{node['cpu_utilization_pct']:.2f}%"
        )

        print(
            f"Memory Capacity    : "
            f"{node['memory_capacity_gb']:.2f} GiB"
        )

        print(
            f"Memory Utilization : "
            f"{node['memory_utilization_pct']:.2f}%"
        )

        print(
            f"Running Pods       : "
            f"{node['running_pods']}"
        )
        print(
            f"Schedulable        :" 
            f"{node['schedulable']}"
        )

        print("-" * 75)

    print(
        f"\nTotal nodes: {len(nodes)}"
    )