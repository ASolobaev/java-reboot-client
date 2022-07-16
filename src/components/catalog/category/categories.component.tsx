import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {selectCategoriesList, selectCategoriesRequestStatus} from "../../../store/catalog/catalog.slice";
import {useEffect} from "react";
import {RequestStatuses} from "../../../interfaces/common/request-statuses.enum";
import {requestCategories} from "../../../store/catalog/catalog.api";
import {CategoryComponent} from "./category.component";
import {CategoryInterface} from "../../../interfaces/category.interface";

export function CategoriesComponent () {
  const dispatch = useAppDispatch();
  const categoriesRequestStatus = useAppSelector(selectCategoriesRequestStatus);
  const categoriesList = useAppSelector(selectCategoriesList);

  useEffect(() => {
    if (categoriesRequestStatus === RequestStatuses.IDLE) {
      dispatch(requestCategories());
    }
  })

  return (
    <Grid container>
      {categoriesList && categoriesList.map((e: CategoryInterface, index) =>
        <Grid item xs={3} padding={1} key={e.name+index+e.id}>
          <CategoryComponent useImages={true} data={e} identifier={`${index}id:${e.id}`} />
        </Grid>
      )}
    </Grid>
  )
}
