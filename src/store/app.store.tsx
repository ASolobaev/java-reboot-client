import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import catalogSlice from "./catalog/catalog.slice";
import cartSlice from "./cart/cart.slice";

export const store = configureStore({
  reducer: {
    catalog: catalogSlice,
    // user: null,
    cart: cartSlice,
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
