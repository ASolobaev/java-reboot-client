import {Route, Routes} from "react-router-dom";
import {CatalogPage} from "../../pages/catalog/catalog.page";
import {Error404Page} from "../../pages/common/Error404.page";

export function AppRoutes () {
  return (
    <Routes>
      <Route path={'/'} element={<CatalogPage />} />
      <Route path={'/user'} element={<Error404Page />} />
      <Route path={'/cart'} element={<Error404Page />} />
    </Routes>
  );
}
