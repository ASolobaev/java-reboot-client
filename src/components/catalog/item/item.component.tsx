import {ItemInterface} from "../../../interfaces/item.interface";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Paper, Button
} from "@mui/material";
import {getItemCardImageSize} from "../../../store/utils";
import ItemImage from "../../../static/item.image.jpg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {
  addToCart, addToOrder,
  itemDecrement,
  itemIncrement,
  removeFromCart,
  removeFromOrder,
  selectItemsById
} from "../../../store/cart/cart.slice";
import {CartItemInterface} from "../../../interfaces/cart-item.interface";

interface ItemComponentProps {
  data: ItemInterface;
  identifier: string;
  useImages?: boolean;
}

export function ItemComponent (props: ItemComponentProps) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectItemsById(props.data.id))[0];

  return (
    <Card
      key={props.identifier}
    >
      {props.useImages && (
        <CardMedia
          component={'div'}
          sx={{
            backgroundImage: `url(${ItemImage})`,
            height: getItemCardImageSize(),
          }}
        />
      )}
      <CardContent
        sx={{
          height: 100,
          overflow: 'hidden'
        }}
      >
        <Typography variant={'h5'}>{props.data.name}</Typography>
        <Typography maxHeight={40} overflow={'hidden'} variant={'body2'}>{props.data.description}</Typography>
        <br/>
        <Typography component={'span'} variant={'overline'}>Производитель: </Typography>
        <Typography component={'span'} variant={'body2'}>{props.data.manufacturer}</Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 40,
        }}
      >
        <Box>
          <Typography component={'span'} variant={'overline'}>цена: </Typography>
          <Typography component={'span'} variant={'h6'}>{props.data.price}&#8381;</Typography>
          <Typography component={'span'} variant={'overline'}>/шт.</Typography>
        </Box>

        {cartItem && (
          <Paper sx={{ padding: '2px' }}>
            {cartItem.itemsCount <= 1 && (
              <IconButton onClick={() => {
                dispatch(removeFromCart(cartItem));
                dispatch(removeFromOrder(cartItem.id));
              }}><DeleteForeverIcon fontSize={'small'}/></IconButton>
            )}
            {cartItem.itemsCount > 1 && (
              <IconButton onClick={() => dispatch(itemDecrement(props.data.id))}><RemoveIcon fontSize={'small'}/></IconButton>
            )}
            <Typography sx={{ verticalAlign: 'middle' }} component={'span'} variant={'h6'}>{cartItem.itemsCount}</Typography>
            <Typography sx={{ verticalAlign: 'bottom' }} component={'span'} variant={'overline'}>шт.</Typography>
            <IconButton color={'success'} disabled={props.data.quantity <= cartItem.itemsCount} onClick={() => dispatch(itemIncrement(props.data.id))}><AddCircleIcon /></IconButton>
          </Paper>
        )}

        {!cartItem && (
          <Button
            disabled={props.data.quantity < 1}
            color={'success'}
            variant={'contained'}
            endIcon={<ShoppingBasketIcon/>}
            onClick={() => {
              const item: CartItemInterface = {
                ...props.data,
                itemsCount: 1,
              };
              dispatch(addToCart(item));
              dispatch(addToOrder(item.id));
            }}
          >В корзину</Button>
        )}
      </CardActions>
    </Card>
  );
}
