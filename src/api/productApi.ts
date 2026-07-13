import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery,

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, search = "", category = "" }) =>
        `/products?page=${page}&search=${search}&category=${category}`,

      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,

      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
