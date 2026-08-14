import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/products`;

type SignedUpload = { uploadUrl: string; fileUrl: string; key: string };

export const uploadImages = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return [];

  const { data } = await axios.post<{ uploads: SignedUpload[] }>(
    `${BASE_URL}/upload`,
    {
      files: files.map((file) => ({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
      })),
    }
  );

  await Promise.all(
    data.uploads.map((upload, i) =>
      axios.put(upload.uploadUrl, files[i], {
        headers: { "Content-Type": files[i]!.type },
      })
    )
  );

  return data.uploads.map((upload) => upload.fileUrl);
};

export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  inStock: boolean;
  images: string[];
};

export type CreateProductDTO = Omit<ProductDTO, "id"> & {
  id?: number;
};

export const createProduct = async (data: CreateProductDTO) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get<ProductDTO[]>(API_URL);
  return res.data;
};

export const getProductById = async (id: string | number) => {
  const res = await axios.get<ProductDTO>(`${API_URL}/${id}`);
  return res.data;
};

export const updateProduct = async (
  id: string | number,
  data: Partial<CreateProductDTO>
) => {
  const res = await axios.patch(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string | number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};