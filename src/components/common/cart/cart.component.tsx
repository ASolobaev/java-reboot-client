import {Badge, IconButton, Typography} from "@mui/material";
import {useAppSelector} from "../../../store/app.store";
import {selectItemsCount} from "../../../store/cart/cart.slice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function CartBubbleComponent () {
  const cartItemsCount = useAppSelector(selectItemsCount);

  return (
    <IconButton
      size={'large'}
    >
      <Badge color={"secondary"} badgeContent={cartItemsCount} max={99}>
        <ShoppingCartIcon fontSize={'inherit'}/>
      </Badge>
    </IconButton>
  );
}
