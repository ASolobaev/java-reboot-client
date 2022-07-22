import {Navigate, Route, Routes} from "react-router-dom";
import {CatalogPage} from "../../pages/catalog/catalog.page";
import {Error404Page} from "../../pages/common/Error404.page";
import {CategoriesComponent} from "../catalog/category/categories.component";
import {ItemsComponent} from "../catalog/item/items.component";
import {CartPage} from "../../pages/cart/cart.page";
import {Error400Page} from "../../pages/common/Error400.page";

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/categories" />} />

      <Route path={'/'} element={<CatalogPage />}>
        <Route path={'categories'} element={<CategoriesComponent />} />
        <Route path={'category'} element={<ItemsComponent />} />
      </Route>
      <Route path={'/user'} element={<Error404Page />} />
      <Route path={'/cart'} element={<CartPage />} />

      <Route path={'/400'} element={<Error400Page />} />
      <Route path={'/404'} element={<Error404Page />} />
      <Route path={"*"} element={<Error404Page />} />
    </Routes>
  );
}
