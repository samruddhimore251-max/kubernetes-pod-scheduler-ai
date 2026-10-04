from flask import Flask, jsonify, request
from flask_cors import CORS

from k8s_model_adapter import get_node_features
from predict_node import recommend_node

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return jsonify({
        "message": "AI Kubernetes Scheduler API is running"
    })


@app.get("/api/nodes")
def get_nodes():
    try:
        nodes = get_node_features()

        return jsonify({
            "success": True,
            "nodes": nodes
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.post("/api/schedule")
def schedule_pod():
    try:
        data = request.get_json(silent=True) or {}

        pod = {
            "cpu_request": float(data.get("cpu_request", 0.5)),
            "memory_request_gb": float(
                data.get("memory_request_gb", 0.5)
            )
        }

        nodes = get_node_features()

        if not nodes:
            return jsonify({
                "success": False,
                "error": "No Kubernetes nodes available"
            }), 503

        result = recommend_node(pod, nodes)

        return jsonify({
            "success": True,
            "pod": pod,
            "recommended_node": result["recommended_node"],
            "message": result["message"],
            "candidates": result["candidates"]
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )