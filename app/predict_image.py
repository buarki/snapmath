from prepare_image import prepare_image_from_data
import tensorflow as tf
import numpy as np

model_name = 'models/1703825980'
print(">> loading model...", flush=True)
loaded_model = tf.saved_model.load(model_name)
print(">> loaded model!", flush=True)

def predict(image_file):
  if image_file.filename == '':
    print("file is empty", flush=True)
    raise Exception("error 'No selected file")

  image_file_content = image_file.read()
  print("read file", flush=True)
  
  prepared_input = prepare_image_from_data(image_file_content)
  print("prepared image", flush=True)
  predictions = loaded_model(tf.constant(prepared_input, dtype=tf.float32))
  print(f"GOT PREDICTIONS {predictions}", flush=True)
  return get_most_probable_number(predictions)

def get_most_probable_number(predictions):
  print(f">>> RECEIVED PREDICTIONS {predictions}")
  probabilities = predictions[0]
  most_probable_index = np.argmax(probabilities)
  most_probable_number = most_probable_index
  probability = probabilities[most_probable_index]
  return {
    "number": most_probable_number,
    "probability": probability,
  }
