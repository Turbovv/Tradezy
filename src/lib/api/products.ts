import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export type CreateProductDTO = {
  name: string;
  description: string;
  priceCents: number;
  inStock: boolean;
  images: string[];
};

export const createProduct = async (data: CreateProductDTO) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id: string | number) => {
  const res = await axios.get(`${API_URL}/${id}`);
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