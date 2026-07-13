import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    profile: builder.query({
      query: () => "/auth/profile",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useLogoutMutation,
} = authApi;
