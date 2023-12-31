import cv2
import numpy as np

'''
It receives the loaded image file, transforms it into an image,
applies a grayscale filter, applies a bitwise_not operations,
resize the image to the shape 28x28 (the shape the model expects),
normalize it and then returns a tensor with shape (1, 28, 28, 1)
carrying the image.
'''
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
