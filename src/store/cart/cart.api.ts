import {OrderDto} from "../../interfaces/order.dto";
import {AppDispatch} from "../app.store";
import {StockAPI} from "../stock.api";
import {removeFromCartById, removeFromOrder, setOrderRequestStatus} from "./cart.slice";
import {RequestStatuses} from "../../interfaces/common/request-statuses.enum";
import {isProduction, useMockOrdering} from "../utils";
import {PostItemInterface} from "../../interfaces/post-item.interface";

export const createOrder = (orderDto: OrderDto) => (dispatch: AppDispatch) => {
  if (!isProduction()) return dispatch(useMockOrdering(orderDto));

  dispatch(setOrderRequestStatus(RequestStatuses.LOADING));
  orderDto.items.map(async (e) => {
    const item: PostItemInterface = {
      productId: e.id,
      quantity: e.itemsCount,
      userId: orderDto.userId,
    }
    try {
      await StockAPI.post('/stock/item/reserve', item);
      dispatch(removeFromCartById(item.productId));
      dispatch(removeFromOrder(item.productId));
    } catch (error) {
      console.log(error);
      dispatch(setOrderRequestStatus(RequestStatuses.ERROR));
    }
  });
  dispatch(setOrderRequestStatus(RequestStatuses.SUCCESS));

  // for (let i = 0; i < body.length; i++) {
  //   await postItem(body[i]);
  // }
  //
  // dispatch(setOrderRequestStatus(RequestStatuses.LOADING));
  // StockAPI
  //   .post('/stock/item/reserve', body)
  //   .then(response => {
  //     dispatch(setOrderRequestStatus(RequestStatuses.SUCCESS));
  //     for (let i = 0; i < orderDto.items.length; i++) {
  //       const item = orderDto.items[i]
  //       dispatch(removeFromOrder(item.id));
  //       dispatch(removeFromCartById(item.id));
  //     }
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     dispatch(setOrderRequestStatus(RequestStatuses.ERROR));
  //     console.log(error);
  //   });
  //
}
