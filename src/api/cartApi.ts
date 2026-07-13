import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery,

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",

      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
