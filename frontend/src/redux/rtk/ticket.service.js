import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["Tickets", "Seats", "Buses"],
  endpoints: (build) => ({
    // Fetch all tickets with optional filters and pagination
    getAllTickets: build.query({
      query: ({ page = 1, limit = 10, departure, destination, types, models, priceMin, priceMax }) => {
        const params = new URLSearchParams({ page, limit });
        if (departure) params.append("departure", departure);
        if (destination) params.append("destination", destination);
        if (types) params.append("types", types); // Already mapped to strings
        if (models) params.append("models", models); // Already mapped to strings
        if (priceMin !== undefined) params.append("priceMin", priceMin);
        if (priceMax !== undefined) params.append("priceMax", priceMax);
        return { url: `/tickets?${params.toString()}` };
      },
      providesTags: ["Tickets"],
    }),
    


    // Fetch the newest tickets with pagination
    getNewestTickets: build.query({
      query: ({ page = 1, limit = 10 }) =>
        `/tickets/newest?page=${page}&limit=${limit}`,
      providesTags: ["Tickets"],
    }),

    // Fetch a ticket by ID
    getTicketById: build.query({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Tickets", id }],
    }),

    // Fetch seats by ticket ID
    getSeatsByTicketId: build.query({
      query: (ticketId) => `/tickets/${ticketId}/seats`,
      providesTags: (result, error, ticketId) => [{ type: "Seats", id: ticketId }],
    }),

    // Fetch all buses with associated tickets
    getAllBuses: build.query({
      query: () => "/buses",
      providesTags: ["Buses"],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetNewestTicketsQuery,
  useGetTicketByIdQuery,
  useGetSeatsByTicketIdQuery,
  useGetAllBusesQuery,
} = ticketApi;
