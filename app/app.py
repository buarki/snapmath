import json
from flask import Flask, request, render_template
from predict_image import predict
from constants import MB

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 2 * MB

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Function to check if a filename has an allowed extension
def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict-result', methods=['POST'])
def predict3():
  try:
    if 'image1' not in request.files or 'image2' not in request.files:
      print("images are missing", flush=True)
      return json.dumps({'error': 'missing image files'})

    number1_image = request.files['image1']
    number2_image = request.files['image2']

    if not (allowed_file(number1_image.filename) and allowed_file(number2_image.filename)):
      print("Invalid file type", flush=True)
      return json.dumps({'error': 'Invalid file type. Allowed types: png, jpg, jpeg'})

    operation = request.form['operation']
    print("OPERATION is", operation, flush=True)

    a = predict(number1_image)
    print(f"a result {a}", flush=True)
    b = predict(number2_image)
    print(f"b result {b}", flush=True)

    # Create a dictionary with the predicted label
    result = {'predicted_label': int(a['number'] + b['number'])}

    json_result = json.dumps(result)

    # Return the JSON response
    return json_result
  except Exception as e:
    print(f"ERROR: {str(e)}", flush=True)
    return json.dumps({'error': str(e)})

@app.route('/', methods=['GET'])
def home():
  return render_template('index.html')

# TODO SUPPORTED FILES...

# TODO RATE LIMITING
# TODO LOGGING...
# TODO TRACING...
# TODO CORS
# TODO if wrong image is sent?
# TODO if the division if by zero?
# TODO specify port?
if __name__ == "__main__":
  app.run(debug=True)
