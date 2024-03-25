export interface SampleImageProps {
  src: string;
  alt: string;
  digit: number;
}
function SampleImage({ src, alt, digit }: SampleImageProps) {
  return (
    <div className="flex flex-col">
      <img className="w-48 h-48 border-2" src={src} alt={alt}/>
      <button
        onClick={() => {
          const anchor = document.createElement('a');
          anchor.href = src;

          anchor.download = `digit_${digit}.png`;

          anchor.click();

          URL.revokeObjectURL(anchor.href);
        }}
        title={`Download image of digit ${digit}`}
        className="bg-primary hover:bg-primary-hover p-2 text-white font-bold w-48">
        Download
      </button>
    </div>
  );
}

export interface ImagesSamplesProps {
  images: SampleImageProps[];
}

export function ImagesSamples({ images }: ImagesSamplesProps) {
  return (
    <div
      className="
        my-10
        flex
        flex-col
        gap-3
      ">
      <h2 className="text-2xl font-bold">Nice images to try:</h2>
      <div
        className="
          flex
          md:flex-row
          flex-col
          gap-3
        ">
        {
          images.map(({ src, digit }) => <SampleImage key={src} src={src} alt={`Number ${digit}`} digit={digit} />)
        }
      </div>
    </div>
  );
}
