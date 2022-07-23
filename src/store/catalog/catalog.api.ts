import {isProduction, useMockCategories, useMockItems} from "../utils";
import {AppDispatch} from "../app.store";
import {StockAPI} from "../stock.api";
import {
  setCategoriesList,
  setCategoriesRequestStatus,
  setItemsList,
  setItemsRequestStatus,
  updateItem
} from "./catalog.slice";
import {RequestStatuses} from "../../interfaces/common/request-statuses.enum";
import {PriceAPI} from "../price.api";
import {ItemInterface} from "../../interfaces/item.interface";

export const requestCategories = () => (dispatch: AppDispatch) => {
  if (!isProduction()) return dispatch(useMockCategories());

  dispatch(setCategoriesRequestStatus(RequestStatuses.LOADING));
  StockAPI
    .get('/stock/item/allCategory')
    .then(response => {
      dispatch(setCategoriesList(response.data));
      dispatch(setCategoriesRequestStatus(RequestStatuses.SUCCESS));
    })
    .catch(error => {
      console.log(error);
      dispatch(setCategoriesRequestStatus(RequestStatuses.ERROR));
    });
};

export const requestItemsByCategory = (categoryId: number) => (dispatch: AppDispatch) => {
  if (!isProduction()) return dispatch(useMockItems(categoryId));

  dispatch(setItemsRequestStatus(RequestStatuses.LOADING));
  StockAPI
    .get<ItemInterface[]>(`/stock/item/all/byCategory?categoryId=${categoryId}`)
    .then(response => {
      const list = response.data;
      dispatch(setItemsList(list));
      dispatch(requestItemsPrice(list));
      dispatch(setItemsRequestStatus(RequestStatuses.SUCCESS));
    })
    .catch(error => {
      console.log(error);
      dispatch(setItemsRequestStatus(RequestStatuses.ERROR));
    });
};

export const requestItemsPrice = (itemsList: ItemInterface[]) => (dispatch: AppDispatch) => {
  for (let i = 0; i < itemsList.length; i++) {
    PriceAPI
      .get(`/price?itemId=${itemsList[i].id}`)
      .then((response) => {
        itemsList[i].price = response.data.value;
        dispatch(updateItem(itemsList[i]));
      })
      .catch(error => {
        console.log(error);
      });
  }
}


