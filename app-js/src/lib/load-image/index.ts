import * as tf from "@tensorflow/tfjs";

export async function loadImageFromFile(file: any) {
  const LOAD_IN_GRAYSCALE = 1;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(tf.browser.fromPixels(img, LOAD_IN_GRAYSCALE));
      // @ts-ignore
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
