import {ItemInterface} from "./item.interface"

export interface CartItemInterface extends ItemInterface {
  itemsCount: number;
}
