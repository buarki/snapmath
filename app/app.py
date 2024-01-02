import json
from flask import Flask, request, render_template
from constants import MB
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from resolve_computation import SumImagesInput
from decorators import check_images_presence, ensure_proper_image_extensions
from app_config_factory import prepare_computation_executor_or_fail
import logging

app = Flask(__name__)
CORS(app)
app.logger.setLevel(logging.DEBUG)
limiter = Limiter(
  app = app,
  key_func = get_remote_address,
  storage_uri = "memory://",
)
app.config['MAX_CONTENT_LENGTH'] = 2 * MB

compute = prepare_computation_executor_or_fail()

@app.route('/predict-result', methods=['POST'])
@limiter.limit("10 per minute")
@check_images_presence
@ensure_proper_image_extensions
def predictHandler():
  try:
    number1_image = request.files['image1'].read()
    number2_image = request.files['image2'].read()
    operation = request.form['operation']
    computation = compute(SumImagesInput(image_1 = number1_image, image_2 = number2_image, operation = operation))
    app.logger.debug(f'performed {computation.number1_result} ({computation.number1_probability}) {operation} {computation.number2_result} ({computation.number2_probability}) = {computation.result} ({computation.probability})')
    return computation.toJSON()
  except Exception as e:
    app.logger.error(f'failed to execute computation, got {str(e)}')
    return json.dumps({'error': str(e)})

@app.route('/', methods=['GET'])
def home():
  return render_template('index.html')

if __name__ == "__main__":
  app.run(debug=True)
