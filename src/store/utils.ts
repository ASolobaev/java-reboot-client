import {AppDispatch} from "./app.store";
import {
  setCategoriesList,
  setCategoriesRequestStatus,
  setItemsList,
  setItemsRequestStatus
} from "./catalog/catalog.slice";
import {RequestStatuses} from "../interfaces/common/request-statuses.enum";
import {CategoryInterface} from "../interfaces/category.interface";
import {ItemInterface} from "../interfaces/item.interface";

export const isProduction = (): Boolean => {
  return process.env.NODE_ENV === 'production';
}

export const useMockCategories = () => (dispatch: AppDispatch) => {
  console.log('called!')
  const mockedCategories: CategoryInterface[] = [
    {
      id: 1,
      name: 'Замороженные продукты',
      description: 'Овощи, мясо, полуфабрикаты'
    },
    {
      id: 2,
      name: 'Напитки',
      description: 'Соки, вода и лимонады'
    },
    {
      id: 3,
      name: 'Бакалея',
      description: 'Макароны, крупы и соусы'
    }
  ];
  dispatch(setCategoriesRequestStatus(RequestStatuses.SUCCESS));
  dispatch(setCategoriesList(mockedCategories));
}

export const useMockItems = (categoryId: number) => (dispatch: AppDispatch) => {
  const mockedItems: ItemInterface[] = [
    {
      id: 1 + categoryId,
      category: categoryId,
      name: 'Чай',
      description: 'Черный чай',
      manufacturer: 'Липтон',
      quantity: 10,
      price: 69.90
    },
    {
      id: 2 + categoryId,
      category: categoryId,
      name: 'Кетчуп томатный',
      description: 'С добавлением кусочков овощей',
      manufacturer: 'Махеев',
      quantity: 7,
      price: 89.70
    },
    {
      id: 3 + categoryId,
      category: categoryId,
      name: 'Пельмени',
      description: 'По домашнему',
      manufacturer: 'Михалыч',
      quantity: 100,
      price: 259.10
    },
  ]
  dispatch(setItemsList(mockedItems));
  dispatch(setItemsRequestStatus(RequestStatuses.SUCCESS));
};

export const getAppName = () => 'SMarket';
export const getDrawerWidth = () => 240;
