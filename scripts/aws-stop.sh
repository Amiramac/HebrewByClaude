#!/bin/bash
# Stop the Hebrew App on AWS (ECS Fargate) to save costs.
# Sets desired task count to 0 — no compute charges while stopped.
# ALB + VPC IP still incur ~$6/month even when stopped.
#
# Usage: bash scripts/aws-stop.sh

CLUSTER="hebrew-app"
SERVICE="hebrew-app-service"
REGION="eu-west-1"

echo ""
echo "=== Stopping Hebrew App on AWS ==="
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

# Scale to 0
aws ecs update-service \
  --cluster "$CLUSTER" \
  --service "$SERVICE" \
  --desired-count 0 \
  --region "$REGION" \
  --query 'service.{desired: desiredCount, status: status}' \
  --output table

echo ""
echo "Service scaled to 0. Fargate charges will stop once tasks drain."
echo "To start again: bash scripts/aws-start.sh"
echo ""
