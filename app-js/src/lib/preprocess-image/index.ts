import * as tf from "@tensorflow/tfjs";

export function preprocessImage(image: any) {
  const resizedImg = tf.image.resizeBilinear(image, [28, 28]);
  const normalizedImg = tf.div(resizedImg, tf.scalar(255));
  const invertedImg = tf.sub(tf.scalar(1), normalizedImg);
  return tf.tensor4d(Array.from(invertedImg.dataSync()), [1, 28, 28, 1]);
}
