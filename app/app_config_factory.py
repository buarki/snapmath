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
  model_version = os.environ.get("MODEL_VERSION")
  if model_version is None:
    print("Error: MODEL_VERSION environment variable is not set.")
    sys.exit(1)

  model_name = f'models/{model_version}'
  print(">> loading model...", flush=True)
  return tf.saved_model.load(model_name)
