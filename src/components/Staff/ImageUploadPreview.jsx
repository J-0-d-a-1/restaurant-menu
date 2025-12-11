export default function ImageUploadPreview({ images, setImages }) {
  // Add an image URL
  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setImages([...images, url]);
  };

  // Remove image by index
  const handleRemoveImages = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block font-semibold mb-2">Images</label>

      <div className="flex gap-4 flex-wrap items-start">
        {/* Upload button */}
        <label className="cursor-pointer border rounded-md p-3 bg-gray-100 hover:bg-gray-200">
          <span className="text-sm">+ Add Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>

        {/* Thumbnails */}
        {images.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={img}
              alt=""
              className="w-full h-20 object-cover rounded-md shadow"
            />
            <button
              type="button"
              onClick={() => handleRemoveImages(index)}
              className="absolute top-0 right-0 bg-black bg-opacity-60 text-white px-1 rounded"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
