"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct, uploadImages } from "~/lib/api/products";

export default function CreateProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceCents, setPriceCents] = useState("");
  const [inStock, setInStock] = useState(true);

  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const previews = files.map((file) => URL.createObjectURL(file));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const imageUrls = await uploadImages(files);

      await createProduct({
        name,
        description,
        priceCents: Number(priceCents),
        inStock,
        images: imageUrls,
      });

      router.push("/");
      router.refresh();
    }
     catch (err) {
        console.log(err)
    } 
  };

  return (
    <div className="max-w-2xl rounded-lg bg-white p-8 shadow">
      <h2 className="mb-6 text-3xl font-semibold">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className="h-24 w-24 rounded border object-cover"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white"
        >
          {loading
            ? "Creating..."
            : "Create Product"}
        </button>
      </form>
    </div>
  );
}