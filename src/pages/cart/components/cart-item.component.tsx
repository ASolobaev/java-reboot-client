import {CartItemInterface} from "../../../interfaces/cart-item.interface";
import {Box, Divider, IconButton, Link, Paper, Typography} from "@mui/material";
import {Checkbox} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {
  addToOrder,
  itemDecrement,
  itemIncrement,
  removeFromCart,
  removeFromOrder,
  selectOrderedItems
} from "../../../store/cart/cart.slice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CartItemComponentProps {
  data: CartItemInterface;
}

export function CartItemComponent (props: CartItemComponentProps) {
  const dispatch = useAppDispatch();
  const readyToOrder = useAppSelector(selectOrderedItems);

  const isInOrder = (): boolean => {
    return readyToOrder.filter((e) => e === props.data.id).length > 0;
  }

  return (
    <Box>
      <Box margin={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Checkbox
            checked={isInOrder()}
            color={isInOrder() ? 'success' : 'default'}
            onClick={() => isInOrder() ? dispatch(removeFromOrder(props.data.id)) : dispatch(addToOrder(props.data.id))}
          />
        </Box>

        <Box width={'40%'}>
          <Typography variant={'h6'}>{props.data.name}</Typography>
          <Typography variant={'body2'}>{props.data.description}</Typography>
          <Box>
            <Link sx={{ cursor: 'pointer' }} fontSize={'small'} onClick={() => dispatch(removeFromCart(props.data))}>Удалить</Link>
          </Box>
        </Box>

        <Box width={'20%'}>
          <Typography variant={'body2'}>Цена за единицу:</Typography>
          <Typography variant={'body1'}>{props.data.price}&#8381;</Typography>
        </Box>

        <Box width={'20%'}>
          <Typography variant={'body2'} component={'span'}>Доступно для заказа:</Typography>
          <Typography variant={'body2'} component={'span'}>{props.data.quantity}</Typography>
          <Box sx={{ padding: '2px' }}>
            {props.data.itemsCount <= 1 && (
              <IconButton onClick={() => dispatch(removeFromCart(props.data))}><DeleteForeverIcon fontSize={'small'}/></IconButton>
            )}
            {props.data.itemsCount > 1 && (
              <IconButton onClick={() => dispatch(itemDecrement(props.data.id))}><RemoveIcon fontSize={'small'}/></IconButton>
            )}
            <Typography sx={{ verticalAlign: 'middle' }} component={'span'} variant={'h6'}>{props.data.itemsCount}</Typography>
            <Typography sx={{ verticalAlign: 'bottom' }} component={'span'} variant={'overline'}>шт.</Typography>
            <IconButton color={'success'} disabled={props.data.quantity <= props.data.itemsCount} onClick={() => dispatch(itemIncrement(props.data.id))}><AddCircleIcon /></IconButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginX: 2 }} />
    </Box>
  )
}