import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query({
      query: () => "/orders",

      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
