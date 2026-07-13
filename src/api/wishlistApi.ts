import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",

  baseQuery,

  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist",

      providesTags: ["Wishlist"],
    }),

    addWishlist: builder.mutation({
      query: (body) => ({
        url: "/wishlist",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Wishlist"],
    }),

    removeWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
} = wishlistApi;
