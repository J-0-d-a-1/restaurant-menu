import { useRef } from "react";

export default function ImageUploadPreview({ images, setImages }) {
  const inputRef = useRef();

  return (
    <div>
      <label className="block font-semibold mb-2">Images</label>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={inputRef}
        className="mb-2"
      />

      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={img.preview}
              className="w-full h-20 object-cover rounded"
            />
            <button className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
