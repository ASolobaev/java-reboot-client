import {RequestStatuses} from "../../interfaces/common/request-statuses.enum";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../app.store";
import {CategoryInterface} from "../../interfaces/category.interface";
import {ItemInterface} from "../../interfaces/item.interface";

interface CatalogState {
  categoriesRequestStatus: RequestStatuses;
  itemsRequestStatus: RequestStatuses;
  categoriesList: CategoryInterface[];
  itemsList: ItemInterface[];
}

const initialState: CatalogState = {
  categoriesRequestStatus: RequestStatuses.IDLE,
  itemsRequestStatus: RequestStatuses.IDLE,
  categoriesList: [],
  itemsList: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategoriesRequestStatus: (state: CatalogState, action: PayloadAction<RequestStatuses>) => {
      state.categoriesRequestStatus = action.payload;
    },
    setItemsRequestStatus: (state: CatalogState, action: PayloadAction<RequestStatuses>) => {
      state.itemsRequestStatus = action.payload;
    },
    setCategoriesList: (state: CatalogState, action: PayloadAction<CategoryInterface[]>) => {
      state.categoriesList = action.payload;
    },
    setItemsList: (state: CatalogState, action: PayloadAction<ItemInterface[]>) => {
      state.itemsList = action.payload;
    },
  },
});

export const {
  setCategoriesRequestStatus,
  setItemsRequestStatus,
  setCategoriesList,
  setItemsList,
} = catalogSlice.actions;

export const selectCategoriesRequestStatus = (state: AppState) => state.catalog.categoriesRequestStatus;
export const selectItemsRequestStatus = (state: AppState) => state.catalog.itemsRequestStatus;
export const selectCategoriesList = (state: AppState) => state.catalog.categoriesList;
export const selectItemsList = (state: AppState) => state.catalog.itemsList;

export default catalogSlice.reducer;
