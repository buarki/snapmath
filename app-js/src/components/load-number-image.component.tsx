import { LoadedMedia } from "@snapmath/types/loaded-media";
import { LoadedImage } from "./loaded-image.component";
import { NumberImage } from "@snapmath/types/number-image";

export interface LoadNumberImage {
  image: NumberImage;
  alt: string;
  onImageLoded: (m: LoadedMedia) => void;
}

export function LoadNumberImage({
    alt,
    image: {
      value,
      probability,
      imageURL,
    },
    onImageLoded,
  }: LoadNumberImage) {
  return (
    <div className="mb-4">
      <label htmlFor="image2" className="block text-sm font-medium text-gray-600">
        Upload Image 2:
      </label>
      <input
        type="file"
        id="image2"
        name="image2"
        accept=".png, .jpg, .jpeg"
        onChange={onImageLoded}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
      {imageURL && (
        <LoadedImage src={imageURL} alt={alt}/>
      )}
      {
        !!value && !!probability ?
        <div className="mt-2">
          <p>Predicted: {value}</p>
          <p>Probability: {(probability * 100).toFixed(4)}%</p>
        </div> :
        <div className="mt-2">
          <p>Not able to predict number from given image.</p>
        </div>
      }
    </div>
  );
}
