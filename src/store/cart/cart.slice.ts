import {CartItemInterface} from "../../interfaces/cart-item.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../app.store";

interface CartState {
  lastUpdate: Date | null;
  items: CartItemInterface[];
  orderItems: number[];
}

const initialState: CartState = {
  lastUpdate: null,
  items: [],
  orderItems: [],
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
    clearCart: (state: CartState) => {
      state.items = [];
    },
    addToOrder: (state: CartState, action: PayloadAction<number>) => {
      state.orderItems.push(action.payload);
    },
    removeFromOrder: (state: CartState, action: PayloadAction<number>) => {
      state.orderItems.map((e: number, index) => {
        if (e == action.payload) {
          state.orderItems.splice(index, 1);
          return true;
        }
        return false;
      });
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
export const selectOrderedItems = (state: AppState) => state.cart.orderItems;
export const selectOrderPrice = (state: AppState) => {
  let result = 0;

  for (let i = 0; i < state.cart.orderItems.length; i++) {
    const id = state.cart.orderItems[i];
    for (let j = 0; j < state.cart.items.length; j++) {
      const item = state.cart.items[j];

      if (item.id === id) {
        result += item.price * item.itemsCount;
        break;
      }
    }
  }
  return result;
}
export const selectOrderedItemCount = (state: AppState) => {
  let result = 0;
  for (let i = 0; i < state.cart.orderItems.length; i++) {
    const id = state.cart.orderItems[i];
    for (let j = 0; j < state.cart.items.length; j++) {
      const item = state.cart.items[j];

      if (item.id === id) {
        result += item.itemsCount;
        break;
      }
    }
  }
  return result;
}

export const selectOrder = (state: AppState) => state.cart.items.filter((item) => state.cart.orderItems.indexOf(item.id) !== -1);

export const {
  addToCart,
  removeFromCart,
  itemIncrement,
  itemDecrement,
  clearCart,
  addToOrder,
  removeFromOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
