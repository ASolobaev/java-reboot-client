import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {Grid} from "@mui/material";
import {selectItemsList, selectItemsRequestStatus} from "../../../store/catalog/catalog.slice";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {RequestStatuses} from "../../../interfaces/common/request-statuses.enum";
import {requestItemsByCategory} from "../../../store/catalog/catalog.api";
import {ItemComponent} from "./item.component";
import {ItemInterface} from "../../../interfaces/item.interface";

export function ItemsComponent () {
  const dispatch = useAppDispatch();
  const itemsRequestStatus = useAppSelector(selectItemsRequestStatus);
  const itemsList = useAppSelector(selectItemsList);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryId = searchParams.get('id');
    if (categoryId) dispatch(requestItemsByCategory(Number.parseInt(categoryId)));
  }, [searchParams, dispatch]);

  return (
    <Grid container sx={{ margin: 0, padding: 0 }}>
      {itemsRequestStatus === RequestStatuses.SUCCESS && itemsList && itemsList.map((e: ItemInterface, index) =>
        <Grid item xs={3} padding={1} key={e.name+index+e.id}>
          <ItemComponent data={e} identifier={`${index}ID:${e.id}`} useImages={true} />
        </Grid>
      )}
    </Grid>
  );
}
