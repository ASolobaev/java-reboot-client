import {isProduction, useMockCategories, useMockItems} from "../utils";
import {AppDispatch} from "../app.store";
import {API} from "../host.api";
import {setCategoriesList, setCategoriesRequestStatus, setItemsList, setItemsRequestStatus} from "./catalog.slice";
import {RequestStatuses} from "../../interfaces/common/request-statuses.enum";

export const requestCategories = () => (dispatch: AppDispatch) => {
  if (!isProduction()) return dispatch(useMockCategories());

  dispatch(setCategoriesRequestStatus(RequestStatuses.LOADING));
  API
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
  API
    .get(`/stock/item/all/byCategory?categoryId=${categoryId}`)
    .then(response => {
      dispatch(setItemsList(response.data));
      dispatch(setItemsRequestStatus(RequestStatuses.SUCCESS));
    })
    .catch(error => {
      console.log(error);
      dispatch(setItemsRequestStatus(RequestStatuses.ERROR));
    });
};


