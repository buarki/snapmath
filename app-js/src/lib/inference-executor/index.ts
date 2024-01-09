import * as tf from "@tensorflow/tfjs";
import { preprocessImage } from "../preprocess-image";

export function runInference(model: any, image: any) {
  const img1Preprocessed = preprocessImage(image);

  const prediction = model?.predict(img1Preprocessed);
  
  // @ts-ignore
  const predictedNumber = tf.argMax(prediction?.flatten()).dataSync()[0];
  // @ts-ignore
  const probability = prediction?.dataSync()[predictedNumber];
  return {
    predictedNumber,
    probability,
  };
}
