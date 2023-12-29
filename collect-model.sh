#/bin/sh

CONTAINER_ID=$1
if [ -z "$CONTAINER_ID" ]; then
  echo "ERROR: CONTAINER_ID must be provided"
  exit 1
fi

MODEL_PATH=$2
if [ -z "$MODEL_PATH" ]; then
  echo "ERROR: MODEL_PATH must be provided"
  exit 1
fi

docker cp "$CONTAINER_ID:/$MODEL_PATH" models/
