# Kubernetes Pod Scheduler with AI — Member 1

This is the AI/ML module for the CC project.

## Goal
Given a Pod's resource requirements and the current condition of several
Kubernetes Nodes, recommend a suitable Node.

## Folder contents
- scheduler_dataset.csv — synthetic dataset
- generate_dataset.py — regenerate dataset
- train_model.py — retrain Random Forest
- scheduler_model.joblib — trained model
- predict_node.py — prediction/recommendation function
- demo.py — working example
- model_metrics.txt — evaluation results
- feature_importance.png — report screenshot
- confusion_matrix.png — report screenshot
- member1_report_notes.md — report/viva material
- requirements.txt — dependencies
- QUICKSTART.txt — quick commands

## Run
python -m pip install -r requirements.txt
python demo.py

To retrain:
python train_model.py

To generate a new dataset:
python generate_dataset.py

## Handoff to scheduler teammate
Use:

from predict_node import recommend_node
result = recommend_node(pod, nodes)
print(result["recommended_node"])

## Important
This is a college prototype using synthetic data. Real Kubernetes telemetry
and placement outcomes should replace the synthetic dataset for a production-
quality model.

# Kubernetes Pod Scheduler with AI

## Member 2 — Kubernetes and AI Scheduling Layer

### Overview

This module integrates the machine-learning model with a live Kubernetes
cluster to perform AI-assisted Pod scheduling.

The scheduler collects real Kubernetes node information, applies
Kubernetes scheduling constraints, uses the Random Forest model to rank
valid nodes, and binds the selected Pod to the recommended node.

---

## Architecture

Kubernetes Cluster
        ↓
Metrics Server
        ↓
Kubernetes Python Client
        ↓
Node Feature Adapter
        ↓
Kubernetes Constraints
        ↓
Random Forest AI Model
        ↓
Node Ranking
        ↓
Custom AI Scheduler
        ↓
Kubernetes Binding API
        ↓
Running Pod

---

## Member 2 Components

### `k8s_test.py`
Connects to the Kubernetes cluster and discovers cluster nodes.

### `k8s_node_adapter.py`
Retrieves Kubernetes node capacity and running Pod information.

### `k8s_model_adapter.py`
Converts live Kubernetes node information into the feature format
required by the AI model.

### `live_scheduler.py`
Runs the AI model against live Kubernetes node data and displays
the recommended node.

### `ai_scheduler_controller.py`
Implements the custom Kubernetes scheduler.

It:
- detects Pending Pods assigned to `ai-scheduler`
- reads Pod CPU and memory requests
- retrieves live node information
- applies scheduling constraints
- ranks valid nodes using the AI model
- binds the Pod to the selected node

### `ai-scheduler-pod.yaml`
Defines a test Pod using:

`schedulerName: ai-scheduler`

---

## Scheduling Logic

The scheduler follows a two-stage decision process:

1. Kubernetes constraints are treated as hard constraints.
2. The AI model ranks the remaining valid nodes.

A node with a `NoSchedule` taint or insufficient resources is not
selected even if its AI score would otherwise be high.

---

## Running the Scheduler

Install dependencies:

```bash
pip install -r requirements.txt