import {CartItemInterface} from "./cart-item.interface";

export interface OrderDto {
  userId: number;
  items: CartItemInterface[];
}
