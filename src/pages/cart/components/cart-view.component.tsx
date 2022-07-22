import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {clearCart, selectAllItems} from "../../../store/cart/cart.slice";
import {Box, Button, Divider, Paper, Toolbar, Typography} from "@mui/material";
import {CartItemInterface} from "../../../interfaces/cart-item.interface";
import {CartItemComponent} from "./cart-item.component";
import NotFoundImage from "../../../static/404.png";
import {Link} from "react-router-dom";

export function CartViewComponent () {
  const cartItems = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();

  return (
    <Paper>
      {cartItems.length > 0 && (
        <Box>
          <Toolbar><Button color={'error'} variant={'outlined'} onClick={() => dispatch(clearCart())}>Очистить корзину</Button></Toolbar>
          <Divider />
          {cartItems && cartItems.map((e:CartItemInterface) =>
            <CartItemComponent data={e} />
          )}

        </Box>
      )}

      {!cartItems.length && (
        <Box
          display={'flex'}
          alignItems={'center'}
        >
          <Box width={200} component={'img'} src={NotFoundImage} margin={10}/>
          <Typography variant={'h5'}>
            В корзине пока пусто, она скучает. Найдите свои любимые товары в нашем <Link to={'/categories'}><b>каталоге</b></Link>
          </Typography>
        </Box>
      )}
    </Paper>
  );
}