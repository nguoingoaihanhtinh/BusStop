import { configureStore } from "@reduxjs/toolkit";
import { userRTKApi } from "./rtk/user.service";
import { ticketApi } from "./rtk/ticket.service";

const store = configureStore({
  reducer: {
    // Add the userRTKApi reducer to the store
    [userRTKApi.reducerPath]: userRTKApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userRTKApi.middleware)
      .concat(ticketApi.middleware),

});

export default store;
