"use client";

import { LoadNumberImage } from "@snapmath/components/load-number-image.component";
import { MathOperationSelect } from "@snapmath/components/math-operation-select.component";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { IOHandler } from "@tensorflow/tfjs-core/dist/io/types";
import { loadImageFromFile } from "@snapmath/lib/load-image";
import { runInference } from "@snapmath/lib/inference-executor";
import { NumberImage } from "@snapmath/types/number-image";
import { Operation, operationsMap } from "@snapmath/types/operation";
import { ImagesSamples } from "@snapmath/components/images-samples.component";

const MODEL_PATH = '/tfjs_model/model.json';
const KB = 1024;
const MAX_ALLOWED_IMAGE_SIZE = 500 * KB;

const emptyNumberImage = {
  value: Number.NaN,
  probability: Number.NaN,
} as NumberImage;

export default function Home() {
  const [numberImage1, setNumberImage1] = useState<NumberImage>(emptyNumberImage);
  const [numberImage2, setNumberImage2] = useState<NumberImage>(emptyNumberImage);
  const [operation, setOperation] = useState<Operation>(Operation.SUM);
  const [model, setModel] = useState<tf.GraphModel<string | IOHandler>>();

  const handleImageChange = async (file: File, updateNumberImageState: any) => {
    const loadedImage1 = await loadImageFromFile(file);
    // @ts-ignore
    const { predictedNumber, probability } = runInference(model, loadedImage1);
    updateNumberImageState({
      probability,
      value: predictedNumber,
      imageURL: URL.createObjectURL(file),
    });
  };

  const cleanInputs = () => {
    setNumberImage1(emptyNumberImage);
    setNumberImage2(emptyNumberImage);
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
    <div className="flex flex-col items-center justify-center w-full h-full flex-auto">
      <h1 className="text-4xl font-bold mb-8">snapmath</h1>
      <div className="bg-white p-8 rounded shadow-xl md:flex md:gap-12 md:items-center md:justify-center">
        <LoadNumberImage
          maxAllowedFile={MAX_ALLOWED_IMAGE_SIZE}
          labelMessage="Select Image 1 (Max 500KB):"
          alt="Image 1"
          image={numberImage1}
          onImageLoded={(e) => handleImageChange(e, setNumberImage1)}/>

        <div className="mb-4">
          <MathOperationSelect onOperationSelected={setOperation}/>
        </div>

        <LoadNumberImage
          maxAllowedFile={MAX_ALLOWED_IMAGE_SIZE}
          labelMessage="Select Image 2 (Max 500KB):"
          alt="Image 2" 
          image={numberImage2}
          onImageLoded={(e) => handleImageChange(e, setNumberImage2)}/>

        {
          !!numberImage1.value && !!numberImage2.value &&
          <div>
            <p className="text-3xl">Result: {operationsMap[operation](numberImage1.value, numberImage2.value)}</p>
            <p className="text-3xl">Probability: {(numberImage1.probability * numberImage2.probability * 100).toFixed(4)}%</p>
          </div>  
        }
      </div>

      <button
        onClick={cleanInputs}
        className="mt-8 bg-primary hover:bg-primary-hover p-2 text-white font-bold">Clear</button>

      <ImagesSamples images={[
        { src: "/imgs/4-1.jpg", alt: `Digit 4`, digit: 4 },
        { src: "/imgs/2-00.jpg", alt: `Digit 2`, digit: 2 },
        { src: "/imgs/1-sample.jpg", alt: `Digit 1`, digit: 1 },
        { src: "/imgs/3-2.png", alt: `Digit 3`, digit: 3 },
        ]}/>
    </div>
  );
};

