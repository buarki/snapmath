import json

operations = {
  '+': lambda a,b : a + b,
  '-': lambda a,b : a - b,
  '*': lambda a,b: a * b,
  '/': lambda a, b: a / b if b != 0.0 else float('nan'),
}

class SumImagesInput:
  def __init__(self, image_1: bytes, image_2: bytes, operation: str):
    self.image_1 = image_1
    self.image_2 = image_2
    if operation not in operations.keys():
      raise Exception(f'given operation {operation} is invalid')
    self.operation = operation

class ImagesSumResult:
  def __init__(
      self,
      result: float,
      probability: float,
      number1_result: float,
      number1_probability: float,
      number2_result: float,
      number2_probability: float,
  ):
    self.result = result
    self.probability = probability
    self.number1_result = number1_result
    self.number1_probability = number1_probability
    self.number2_result = number2_result
    self.number2_probability = number2_probability
  
  def toJSON(self):
    return json.dumps({
      'result': float(self.result),
      'probability': float(self.probability),
      'number1_result': float(self.number1_result),
      'number1_probability': float(self.number1_probability),
      'number2_result': float(self.number2_result),
      'number2_probability': float(self.number2_probability),
    })

'''
computation_factory is a factory to build the inference function. It receives two functions as arguments:
- prepare_image_from_data: a function to get image bytes and traform into a valid inference input;
- infer: a function that receives a tensor (1, 28, 28, 1) and gives the inferred number with its probability.
'''
def computation_factory(prepare_image_from_data, infer):
  
  '''
  infer performs the inference on given
  '''
  def compute(input: SumImagesInput) -> ImagesSumResult:
    prepared_image_1 = prepare_image_from_data(input.image_1)
    a = infer(prepared_image_1)
    print(f"a result {a.result}, prob: {a.probability}", flush=True)
    prepared_image_1 = prepare_image_from_data(input.image_2)
    b = infer(prepared_image_1)
    print(f"b result {b.result}, prob: {b.probability}", flush=True)
    return ImagesSumResult(
      result = operations[input.operation](a.result, b.result),
      probability = a.probability * b.probability,
      number1_result = a.result,
      number1_probability = a.probability,
      number2_result = b.result,
      number2_probability = b.probability,
    )
  return compute
