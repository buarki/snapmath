import tensorflow as tf
import numpy as np
import json
import cv2
from flask import Flask, request, render_template

#### loading the model #####
## TODO read from env
model_name = 'models/1703825980'

print(">> loading model...", flush=True)
loaded_model = tf.saved_model.load(model_name)
print(">> loaded model!", flush=True)
signature = loaded_model.signatures['serving_default']

app = Flask(__name__)

def prepare_image_from_data(image_data):
  print("starting...", flush=True)
  img = cv2.imdecode(np.fromstring(image_data, np.uint8), cv2.IMREAD_UNCHANGED)
  print("decoded image",  flush=True)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  print("loaded in grayscale",  flush=True)
  img = cv2.bitwise_not(img)
  print("inverted bits",  flush=True)
  img = cv2.resize(img, (28, 28))
  print("resized",  flush=True)
  img = img / 255
  print("scaled", flush=True)
  return img.reshape(1, 28, 28, 1)

def prepare_image(image_path):
  img = cv2.imread(image_path)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  img = cv2.bitwise_not(img)
  img = cv2.resize(img, (28, 28))
  img = img / 255
  return img.reshape(1, 28,28,1)

image_path = '1.jpeg'

@app.route('/predict2')
def predict2():
  print("Preparing image...", flush=True)
  prepared_input = prepare_image(image_path)
  print("Prepared image", flush=True)
  print("Predicting...", flush=True)
  output = signature(tf.constant(prepared_input, dtype=tf.float32))
  print("Predicted", flush=True)
  predictions_tensor = output['dense_3']
  predicted_label = tf.argmax(predictions_tensor, axis=1).numpy()[0]

  # Create a dictionary with the predicted label
  result = {'predicted_label': int(predicted_label)}

  # Convert the dictionary to a JSON-formatted string
  json_result = json.dumps(result)

  # Return the JSON response
  return json_result


@app.route('/predict', methods=['POST'])
def predict1():
  try:
    if 'file' not in request.files:
        print("there is no files", flush=True)
        return json.dumps({'error': 'No file part'})

    file = request.files['file']
    print("got file", file.filename, flush=True)

    # Check if the file is empty
    if file.filename == '':
        print("file is empty", flush=True)
        return json.dumps({'error': 'No selected file'})

    # Read the file content
    file_content = file.read()
    print("read file", flush=True)

    # image_data = base64.b64decode(file_content)
    # print("decoded image", flush=True)

    prepared_input = prepare_image_from_data(file_content)

    print("prepared image", flush=True)

    print("Predicting...", flush=True)
    output = signature(tf.constant(prepared_input, dtype=tf.float32))
    print("Predicted", flush=True)
    predictions_tensor = output['dense_3']
    predicted_label = tf.argmax(predictions_tensor, axis=1).numpy()[0]

    # Create a dictionary with the predicted label
    result = {'predicted_label': int(predicted_label)}

    # Convert the dictionary to a JSON-formatted string
    json_result = json.dumps(result)

    # Return the JSON response
    return json_result
  except Exception as e:
    return json.dumps({'error': str(e)})

#################################################################################
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

def image2number(image_file):
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

@app.route('/predict-result', methods=['POST'])
def predict3():
  try:
    if 'image1' not in request.files or 'image2' not in request.files:
      print("images are missing", flush=True)
      return json.dumps({'error': 'missing image files'})

    number1_image = request.files['image1']
    number2_image = request.files['image2']
    operation = request.form['operation']
    print("OPERATION is", operation, flush=True)

    a = image2number(number1_image)
    print(f"a result {a}", flush=True)
    b = image2number(number2_image)
    print(f"b result {b}", flush=True)

    # Create a dictionary with the predicted label
    result = {'predicted_label': int(a['number'] + b['number'])}

    # Convert the dictionary to a JSON-formatted string
    json_result = json.dumps(result)

    # Return the JSON response
    return json_result
  except Exception as e:
    print(f"ERROR: {str(e)}", flush=True)
    return json.dumps({'error': str(e)})

@app.route('/', methods=['GET'])
def home():
  return render_template('index.html')

# TODO set max file limt
# TODO RATE LIMITING
# TODO LOGGING...
# TODO TRACING...
# TODO CORS
# TODO SUPPORTED FILES...
# TODO if wrong image is sent?
# TODO if the division if by zero?
# TODO specify port?
if __name__ == "__main__":
  app.run(debug=True)
