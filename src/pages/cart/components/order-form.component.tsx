import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import {useAppSelector} from "../../../store/app.store";
import {
  selectOrder,
  selectOrderedItemCount,
  selectOrderPrice
} from "../../../store/cart/cart.slice";

export function OrderFormComponent () {
  const itemsCount = useAppSelector(selectOrderedItemCount);
  const orderPrice = useAppSelector(selectOrderPrice);
  const order = useAppSelector(selectOrder);

  return (
    <Paper>
      <Box padding={2}>
        <Button disabled={!itemsCount} fullWidth variant={'contained'} color={'success'}>Зарезервировать</Button>
        <Typography paddingTop={2} variant={"body2"}>Доставка пока недоступна, но вы можете зарезервировать товар и забрать его в магазине.</Typography>
      </Box>
      <Divider />
      <Box padding={2}>
        <Typography variant={'h6'}>Ваша корзина</Typography>
        {itemsCount > 0 && order.map((e) =>
          <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
            <Box>
              <Typography component={'span'}>{e.name} * </Typography>
              <Typography component={'span'}>({e.itemsCount})</Typography>
            </Box>
            <Box>
              <Typography>{(e.price * e.itemsCount).toFixed(2)}&#8381;</Typography>
            </Box>
          </Box>
        )}
        <Divider/>
        <Box alignItems={'end'} display={"flex"} justifyContent={"space-between"}>
          <Typography variant={'body1'}>Товары ({itemsCount})</Typography>
          <Typography variant={"h6"}>{orderPrice.toFixed(2)}&#8381;</Typography>
        </Box>
      </Box>
    </Paper>
  );
}