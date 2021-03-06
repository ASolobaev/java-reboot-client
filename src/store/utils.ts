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
import {removeFromCartById, removeFromOrder, setOrderRequestStatus} from "./cart/cart.slice";
import {OrderDto} from "../interfaces/order.dto";
import {PostItemInterface} from "../interfaces/post-item.interface";

export const isProduction = (): Boolean => {
  return process.env.NODE_ENV === 'production';
}

export const useMockCategories = () => (dispatch: AppDispatch) => {
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
      id: 100 + categoryId,
      category: categoryId,
      name: 'Чай',
      description: 'Черный чай',
      manufacturer: 'Липтон',
      quantity: 10,
      price: 69.90
    },
    {
      id: 200 + categoryId,
      category: categoryId,
      name: 'Кетчуп томатный',
      description: 'С добавлением кусочков овощей',
      manufacturer: 'Махеев',
      quantity: 7,
      price: 89.70
    },
    {
      id: 300 + categoryId,
      category: categoryId,
      name: 'Пельмени',
      description: 'По домашнему',
      manufacturer: 'Михалыч',
      quantity: 100,
      price: 259.10
    },
    {
      id: 400 + categoryId,
      category: categoryId,
      name: 'Coca-Cola',
      description: 'Санкционочка',
      manufacturer: 'Pepsi Co',
      quantity: 100,
      price: 79
    },
    {
      id: 500 + categoryId,
      category: categoryId,
      name: 'Cool Cola',
      description: 'Главное - не приглядываться к названию ;)',
      manufacturer: 'Черноголовка',
      quantity: 100,
      price: 99.90
    },
  ]
  dispatch(setItemsList(mockedItems));
  dispatch(setItemsRequestStatus(RequestStatuses.SUCCESS));
};

export const useMockOrdering = (order: OrderDto) => (dispatch: AppDispatch) => {
  dispatch(setOrderRequestStatus(RequestStatuses.LOADING));
  setTimeout(() => {
    const useSuccess = true;
    if (useSuccess) {
      order.items.map(async (e) => {
        const item: PostItemInterface = {
          productId: e.id,
          quantity: e.itemsCount,
          userId: order.userId,
        }
        dispatch(removeFromCartById(item.productId));
        dispatch(removeFromOrder(item.productId));
      });
      dispatch(setOrderRequestStatus(RequestStatuses.SUCCESS));
    } else {
      dispatch(setOrderRequestStatus(RequestStatuses.ERROR));
    }
    setTimeout(() => dispatch(setOrderRequestStatus(RequestStatuses.IDLE)), 5000);
  }, 5000);
}

export const getAppName = () => 'SMarket';
export const getDrawerWidth = () => 240;
export const getCategoryCardImageSize = () => 10;
export const getItemCardImageSize = () => 10;
