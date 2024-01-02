from prepare_image import prepare_image_from_data
import os
import sys
import tensorflow as tf
from image_inference import inference_factory
from resolve_computation import computation_factory

def prepare_computation_executor_or_fail():
  inference_model = load_inference_model()

  infer = inference_factory(inference_model)

  return computation_factory(prepare_image_from_data, infer)

def load_inference_model():
  MODEL_PATH = os.environ.get("MODEL_PATH")
  if MODEL_PATH is None:
    print("Error: MODEL_PATH environment variable is not set.")
    sys.exit(1)

  print(">> loading model...", flush=True)
  return tf.saved_model.load(MODEL_PATH)
