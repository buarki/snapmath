import json
from flask import Flask, request, render_template
from constants import MB
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from resolve_computation import resolve, SumImagesInput, ImagesSumResult
from decorators import check_images_presence, ensure_proper_image_extensions

app = Flask(__name__)
CORS(app)
limiter = Limiter(
  app = app,
  key_func = get_remote_address,
  storage_uri = "memory://",
)
app.config['MAX_CONTENT_LENGTH'] = 2 * MB

@app.route('/predict-result', methods=['POST'])
@limiter.limit("10 per minute")
@check_images_presence
@ensure_proper_image_extensions
def predictHandler():
  try:
    number1_image = request.files['image1'].read()
    number2_image = request.files['image2'].read()
    operation = request.form['operation']
    print("OPERATION is", operation, flush=True)

    computation = resolve(SumImagesInput(image_1 = number1_image, image_2 = number2_image, operation = operation))
    print(f"computation {computation}, {computation.result} and {computation.probability}")
    return json.dumps({
      'result': float(computation.result),
      'probability': float(computation.probability),
    })
  except Exception as e:
    print(f"ERROR: {str(e)}", flush=True)
    return json.dumps({'error': str(e)})

@app.route('/', methods=['GET'])
def home():
  return render_template('index.html')

# TODO handle logging
# TODO if wrong image is sent?
if __name__ == "__main__":
  app.run(debug=True)
