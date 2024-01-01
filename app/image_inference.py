import tensorflow as tf
import numpy as np

# Holds inferred number with its probability
class InferenceResult:
  def __init__(self, result: float, probability: float):
    self.result = result
    self.probability = probability

'''
inference_factory receives the loaded inference model as argument to prepare
and return tha function to perform the image inference returning the probable
number present on the image.
'''
def inference_factory(inference_model):

  '''
  infer executes the image inference and returns the inferred number with its
  probability.
  '''
  def infer(image_file: np.ndarray) -> InferenceResult:
    print("prepared image", flush=True)
    predictions = inference_model(tf.constant(image_file, dtype=tf.float32))
    print(f"GOT PREDICTIONS {predictions}", flush=True)
    return get_most_probable_number(predictions)
  return infer

'''
get_most_probable_number is a helper function to get the
most probable number with its probability.
'''
def get_most_probable_number(predictions) -> InferenceResult:
  print(f">>> RECEIVED PREDICTIONS {predictions}")
  probabilities = predictions[0]
  most_probable_index = np.argmax(probabilities)
  most_probable_number = most_probable_index
  probability = probabilities[most_probable_index].numpy()
  return InferenceResult(result = most_probable_number, probability = probability)
