import { LoadedMedia } from "@snapmath/types/loaded-media";
import { LoadedImage } from "./loaded-image.component";
import { NumberImage } from "@snapmath/types/number-image";
import { useEffect, useRef } from "react";

export interface LoadNumberImage {
  image: NumberImage;
  alt: string;
  labelMessage: string;
  onImageLoded: (m: File) => void;
  maxAllowedFile: number;
}

export function LoadNumberImage({
    alt,
    labelMessage,
    image: {
      value,
      probability,
      imageURL,
    },
    maxAllowedFile,
    onImageLoded,
  }: LoadNumberImage) {
  const inputRef = useRef<any>(null);

  const handleFileChange = (e: LoadedMedia) => {
    const file = e.target.files![0];
    if (file) {
      if (file.size > maxAllowedFile) {
        alert("File size exceeds the maximum allowed (500KB). Please choose a smaller file.");
        if (inputRef?.current) {
          inputRef.current.value = '';
        }
        return;
      }
      onImageLoded(file);
    }
  };
  
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
  }, [imageURL]);

  return (
    <div className="mb-4">
      <label htmlFor="image2" className="block text-sm font-medium text-gray-600">
        { labelMessage }
      </label>
      <input
        ref={inputRef}
        type="file"
        id="image2"
        name="image2"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
      {imageURL && (
        <LoadedImage src={imageURL} alt={alt}/>
      )}
      {
        !!value && !!probability && !!imageURL ?
        <div className="mt-2">
          <p>Predicted: {value}</p>
          <p>Probability: {(probability * 100).toFixed(4)}%</p>
        </div> :
            Number.isNaN(value) && Number.isNaN(probability) && imageURL === undefined ? 
            null :
          <div className="mt-2">
            <p>Not able to predict number from given image.</p>
          </div>
      }
    </div>
  );
}
