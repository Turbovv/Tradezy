import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterInput) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return res.data;
};

export const loginUser = async (data: LoginInput) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return res.data;
};
