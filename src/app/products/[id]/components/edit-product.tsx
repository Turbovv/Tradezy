import { useState } from "react";
import { updateProduct, uploadImages, type CreateProductDTO } from "~/lib/api/products";

type EditProductFormProps = {
  product: CreateProductDTO & { id: number };
  onClose: () => void;
};

export default function EditProductForm({
  product,
  onClose,
}: EditProductFormProps) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [priceCents, setPriceCents] = useState(
    product.priceCents.toString()
  );
  const [inStock, setInStock] = useState(product.inStock);
  const [images, setImages] = useState<string[]>(product.images ?? []);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = (url: string) => {
    setImages((current) => current.filter((image) => image !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    let uploadedImages: string[] = [];

    if (files.length > 0) {
      uploadedImages = await uploadImages(files);
    }

    await updateProduct(product.id, {
      name,
      description,
      priceCents: Number(priceCents),
      inStock,
      images: [...images, ...uploadedImages],
    });

    onClose();
  } finally {
    setLoading(false);
  }
};
  return (
    <form onSubmit={handleSubmit}>


       <div>
          <label className="mb-2 block">
            Product Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
            Price (cents)
          </label>

          <input
            type="number"
            value={priceCents}
            onChange={(e) =>
              setPriceCents(e.target.value)
            }
            className="w-full rounded border p-2"
            required
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) =>
              setInStock(e.target.checked)
            }
          />
          In Stock
        </label>

        <div>
          <label className="mb-2 block">
            Product Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setFiles(
                Array.from(e.target.files ?? [])
              )
            }
          />
        </div>

        {images.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((imageUrl) => (
              <div key={imageUrl} className="relative overflow-hidden rounded border">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="h-32 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
}