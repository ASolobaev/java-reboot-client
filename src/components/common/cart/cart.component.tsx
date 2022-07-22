import {Badge, IconButton, Typography} from "@mui/material";
import {useAppSelector} from "../../../store/app.store";
import {selectItemsCount} from "../../../store/cart/cart.slice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link as RouterLink} from  "react-router-dom";

export function CartBubbleComponent () {
  const cartItemsCount = useAppSelector(selectItemsCount);

  return (
    <IconButton
      size={'large'}
    >
      <Badge sx={{ textDecoration: 'none', color: 'inherit' }} component={RouterLink} to={'/cart'} color={"secondary"} badgeContent={cartItemsCount} max={99}>
        <ShoppingCartIcon fontSize={'inherit'}/>
      </Badge>
    </IconButton>
  );
}
