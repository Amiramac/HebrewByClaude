#!/bin/bash
# Start the Hebrew App on AWS (ECS Fargate).
# Sets desired task count to 1 — takes ~30-60 seconds to become healthy.
#
# Usage: bash scripts/aws-start.sh

CLUSTER="hebrew-app"
SERVICE="hebrew-app-service"
REGION="eu-west-1"

echo ""
echo "=== Starting Hebrew App on AWS ==="
echo ""

# Check current state
CURRENT=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].{desired: desiredCount, running: runningCount, status: status}' \
  --output table 2>/dev/null)

echo "Current state:"
echo "$CURRENT"
echo ""

# Scale to 1
aws ecs update-service \
  --cluster "$CLUSTER" \
  --service "$SERVICE" \
  --desired-count 1 \
  --region "$REGION" \
  --query 'service.{desired: desiredCount, status: status}' \
  --output table

echo ""
echo "Service scaling to 1. Wait ~60 seconds for the task to start."
echo ""

# Wait for stabilization
echo "Waiting for service to stabilize..."
aws ecs wait services-stable \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "Service is running and healthy!"
  echo "App: https://www.hebrew-app.live"
else
  echo "Timeout waiting — check AWS console for status."
fi
echo ""
