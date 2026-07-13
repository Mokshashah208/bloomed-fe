import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { productApi } from "../api/productApi";
import { cartApi } from "../api/cartApi";
import { wishlistApi } from "../api/wishlistApi";
import { orderApi } from "../api/orderApi";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
