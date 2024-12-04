import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userRTKApi = createApi({
  reducerPath: "userRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["user", "order"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    checkLogin: build.query({
      query: () => ({
        url: "/user/checkjwt",
        credentials: "include",
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    getOrder: build.query({
      query: () => ({
        url: "/user/orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["order"],
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: "/user/orders/create-order",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["order"], // Invalidate the 'order' tag to refresh the order data
    }),
    getUserById: build.query({
      query: (userId) => ({
        url: `/user/${userId}`, // Assuming you have a route like '/user/:userId'
        method: "GET",
        credentials: "include", // Include credentials if needed
      }),
      providesTags: ["user"], // Tag for caching purposes
    }),
    getOrderDetail: build.query({
      query: (orderId) => ({
        url: `/user/orders/${orderId}`, // Assuming you have a route like '/user/orders/:orderId'
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["order"], // Tag to cache and track order data
    }),
  }),
});
export const { useLoginMutation, useCheckLoginQuery, useRegisterMutation, useGetOrderQuery, useCreateOrderMutation, useGetUserByIdQuery, useGetOrderDetailQuery } = userRTKApi;
