from predict_image import predict, PredictionResult
from prepare_image import prepare_image_from_data

operations = {
  '+': lambda a,b : a + b,
  '-': lambda a,b : a - b,
  '*': lambda a,b: a * b,
  '/': lambda a, b: a / b if b != 0 else float('nan'),
}

class SumImagesInput:
  def __init__(self, image_1: bytes, image_2: bytes, operation: str):
    self.image_1 = image_1
    self.image_2 = image_2
    if operation not in operations.keys():
      raise Exception(f'given operation {operation} is invalid')
    self.operation = operation

class ImagesSumResult:
  def __init__(self, result, probability):
    self.result = result
    self.probability = probability

def resolve(input: SumImagesInput) -> ImagesSumResult:
  prepared_image_1 = prepare_image_from_data(input.image_1)
  a = predict(prepared_image_1)
  print(f"a result {a.result}, prob: {a.probability}", flush=True)
  prepared_image_1 = prepare_image_from_data(input.image_2)
  b = predict(prepared_image_1)
  print(f"b result {b.result}, prob: {b.probability}", flush=True)
  return ImagesSumResult(
    result = operations[input.operation](a.result, b.result),
    probability = a.probability * b.probability,
  )
