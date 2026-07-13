import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
