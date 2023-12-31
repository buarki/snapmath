from prepare_image import prepare_image_from_data
import tensorflow as tf
import numpy as np
import os
import sys

class PredictionResult:
  def __init__(self, result, probability):
    self.result = result
    self.probability = probability

model_version = os.environ.get("MODEL_VERSION")
if model_version is None:
  print("Error: MODEL_VERSION environment variable is not set.")
  sys.exit(1)

model_name = f'models/{model_version}'
print(">> loading model...", flush=True)
loaded_model = tf.saved_model.load(model_name)
print(f">> loaded model {model_name}!", flush=True)

def predict(image_file: np.ndarray) -> PredictionResult:
  # TODO just receive it rather than handling it
  # image_file_content = image_file.read()
  # print("read file", flush=True)
  
  # prepared_input = prepare_image_from_data(image_file)
  print("prepared image", flush=True)
  predictions = loaded_model(tf.constant(image_file, dtype=tf.float32))
  print(f"GOT PREDICTIONS {predictions}", flush=True)
  return get_most_probable_number(predictions)

def get_most_probable_number(predictions) -> PredictionResult:
  print(f">>> RECEIVED PREDICTIONS {predictions}")
  probabilities = predictions[0]
  most_probable_index = np.argmax(probabilities)
  most_probable_number = most_probable_index
  probability = probabilities[most_probable_index].numpy()
  return PredictionResult(result = most_probable_number, probability = probability)
