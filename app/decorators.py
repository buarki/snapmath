import json
from functools import wraps
from flask import request

def check_images_presence(f):
  @wraps(f)
  def wrapper(*args, **kwargs):
    if 'image1' not in request.files or 'image2' not in request.files:
      print("Images are missing", flush=True)
      return json.dumps({'error': 'Missing image files'})
    
    number1_image = request.files['image1']
    number2_image = request.files['image2']
    if number1_image.filename == '':
      raise Exception("The first number image is empty")
    if number2_image.filename == '':
      raise Exception("The second number image is empty")
    return f(*args, **kwargs)
  return wrapper

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def ensure_proper_image_extensions(f):
  @wraps(f)
  def wrapper(*args, **kwargs):
    number1_image = request.files['image1']
    number2_image = request.files['image2']

    if not (allowed_file(number1_image.filename) and allowed_file(number2_image.filename)):
      print("Invalid file type", flush=True)
      return json.dumps({'error': 'Invalid file type. Allowed types: png, jpg, jpeg'})
    return f(*args, **kwargs)
  return wrapper
