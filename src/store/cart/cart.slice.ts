import {CartItemInterface} from "../../interfaces/cart-item.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../app.store";

interface CartState {
  lastUpdate: Date | null;
  items: CartItemInterface[];
}

const initialState: CartState = {
  lastUpdate: null,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItemInterface>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state: CartState, action: PayloadAction<CartItemInterface>) => {
      state.items.map((e, index) => {
        if (e.id === action.payload.id) {
          state.items.splice(index, 1);
          return true;
        }
        return false;
      });
    },
    itemIncrement: (state: CartState, action: PayloadAction<number>) => {
      state.items.map((e) => {
        if (e.id === action.payload) {
          e.itemsCount++;
          return true;
        }
        return false;
      });
    },
    itemDecrement: (state: CartState, action: PayloadAction<number>) => {
      state.items.map((e) => {
        if (e.id === action.payload) {
          e.itemsCount--;
          return true;
        }
        return false;
      });
    },
    clear: (state: CartState) => {
      state.items.splice(0, state.items.length - 1);
    },
  },
});

export const selectAllItems = (state: AppState) => state.cart.items;
export const selectItemsById = (itemId: number) => (state: AppState) => state.cart.items.filter((e: CartItemInterface) => e.id === itemId);
export const selectItemsCount = (state: AppState) => {
  let itemsCount = 0;
  state.cart.items.map((e) => {
    itemsCount += e.itemsCount;
    return true;
  })
  return itemsCount;
};


export const {
  addToCart,
  removeFromCart,
  itemIncrement,
  itemDecrement,
  clear
} = cartSlice.actions;

export default cartSlice.reducer;
