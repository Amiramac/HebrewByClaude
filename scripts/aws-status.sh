#!/bin/bash
# Check Hebrew App status on AWS.
#
# Usage: bash scripts/aws-status.sh

CLUSTER="hebrew-app"
SERVICE="hebrew-app-service"
REGION="eu-west-1"

echo ""
echo "=== Hebrew App AWS Status ==="
echo ""

aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].{Status: status, Desired: desiredCount, Running: runningCount, Pending: pendingCount}' \
  --output table 2>/dev/null

RUNNING=$(aws ecs describe-services \
  --cluster "$CLUSTER" \
  --services "$SERVICE" \
  --region "$REGION" \
  --query 'services[0].runningCount' \
  --output text 2>/dev/null)

echo ""
if [ "$RUNNING" = "0" ]; then
  echo "App is STOPPED (no Fargate charges)"
  echo "Start with: bash scripts/aws-start.sh"
else
  echo "App is RUNNING at https://www.hebrew-app.live"
  echo "Stop with:  bash scripts/aws-stop.sh"
fi
echo ""
