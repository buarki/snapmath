import cv2
import numpy as np

'''
It receives the loaded image file, transforms it into an image,
applies a grayscale filter, applies a bitwise_not operations,
resize the image to the shape 28x28 (the shape the model expects),
normalize it and then returns a tensor with shape (1, 28, 28, 1)
carrying the image.
'''
def prepare_image_from_data(image_data: bytes) -> np.ndarray:
  img = cv2.imdecode(np.fromstring(image_data, np.uint8), cv2.IMREAD_UNCHANGED)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  img = cv2.bitwise_not(img)
  img = cv2.resize(img, (28, 28))
  img = img / 255
  return img.reshape(1, 28, 28, 1)
