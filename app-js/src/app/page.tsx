"use client";

import { LoadNumberImage } from "@snapmath/components/load-number-image.component";
import { MathOperationSelect } from "@snapmath/components/math-operation-select.component";
import { LoadedMedia } from "@snapmath/types/loaded-media";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { IOHandler } from "@tensorflow/tfjs-core/dist/io/types";
import { loadImageFromFile } from "@snapmath/lib/load-image";
import { runInference } from "@snapmath/lib/inference-executor";
import { NumberImage } from "@snapmath/types/number-image";
import { Operation, operationsMap } from "@snapmath/types/operation";

const MODEL_PATH = '/tfjs_model/model.json';

const emptyNumberImage = {
  value: Number.NaN,
  probability: Number.NaN,
} as NumberImage;

export default function Home() {
  const [numberImage1, setNumberImage1] = useState<NumberImage>(emptyNumberImage);
  const [numberImage2, setNumberImage2] = useState<NumberImage>(emptyNumberImage);
  const [operation, setOperation] = useState<Operation>(Operation.SUM);
  const [model, setModel] = useState<tf.GraphModel<string | IOHandler>>();

  const handleImage1Change = async (e: LoadedMedia) => {
    const file = e.target.files![0];
    if (file) {
      const loadedImage1 = await loadImageFromFile(file);
      // @ts-ignore
      const { predictedNumber, probability } = runInference(model, loadedImage1);
      setNumberImage1({
        probability,
        value: predictedNumber,
        imageURL: URL.createObjectURL(file),
      });
    }
  };

  const handleImage2Change = async (e: LoadedMedia) => {
    const file = e.target.files![0];
    if (file) {
      const loadedImage2 = await loadImageFromFile(file);
      // @ts-ignore
      const { predictedNumber, probability } = runInference(model, loadedImage2);
      setNumberImage2({
        probability,
        value: predictedNumber,
        imageURL: URL.createObjectURL(file),
      });
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      // todo adjust it
      const model = await tf?.loadGraphModel(MODEL_PATH);
      setModel(model);
    };
    loadModel();
    console.log('model loaded');
  }, []);

  useEffect(() => {}, [numberImage1, numberImage2]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">snapmath</h1>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <LoadNumberImage alt="Image 1" image={numberImage1} onImageLoded={handleImage1Change}/>

        <div className="mb-4">
          <MathOperationSelect onOperationSelected={setOperation}/>
        </div>

        <LoadNumberImage alt="Image 2" image={numberImage2} onImageLoded={handleImage2Change}/>

        {
          !!numberImage1.value && !!numberImage2.value &&
          <div>
            <p className="text-3xl">Result: {operationsMap[operation](numberImage1.value, numberImage2.value)}</p>
            <p className="text-3xl">Probability: {(numberImage1.probability * numberImage2.probability * 100).toFixed(4)}%</p>
          </div>  
        }
      </div>
    </div>
  );
};

