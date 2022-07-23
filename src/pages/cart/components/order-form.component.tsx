import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {
  selectOrder,
  selectOrderedItemCount,
  selectOrderPrice, selectOrderStatus
} from "../../../store/cart/cart.slice";
import {selectUser} from "../../../store/user/user.slice";
import {OrderDto} from "../../../interfaces/order.dto";
import {createOrder} from "../../../store/cart/cart.api";
import {RequestStatuses} from "../../../interfaces/common/request-statuses.enum";
import React from "react";
import LoadingImage from '../../../static/loading.png';
import SuccessImage from '../../../static/success.png';
import ErrorImage from '../../../static/500.png';

export function OrderFormComponent () {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectOrderedItemCount);
  const orderPrice = useAppSelector(selectOrderPrice);
  const order = useAppSelector(selectOrder);
  const user = useAppSelector(selectUser);
  const orderStatus = useAppSelector(selectOrderStatus);

  return (
    <Paper>
      {orderStatus === RequestStatuses.IDLE && (
        <React.Fragment>
          <Box padding={2}>
            <Button
              disabled={!itemsCount || !user.id}
              fullWidth
              variant={'contained'}
              color={'success'}
              onClick={() => {
                if (!user.id) return false;
                const dto: OrderDto = {
                  userId: user.id,
                  items: order,
                }
                dispatch(createOrder(dto));
              }}
            >
              Зарезервировать
            </Button>
            <Typography paddingTop={2} variant={"body2"}>Доставка пока недоступна, но вы можете зарезервировать товар и забрать его в пункте выдачи.</Typography>
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
                  <Typography>{((e.price ? e.price : 0) * e.itemsCount).toFixed(2)}&#8381;</Typography>
                </Box>
              </Box>
            )}
            <Divider/>
            <Box alignItems={'end'} display={"flex"} justifyContent={"space-between"}>
              <Typography variant={'body1'}>Товары ({itemsCount})</Typography>
              <Typography variant={"h6"}>{orderPrice.toFixed(2)}&#8381;</Typography>
            </Box>
          </Box>
        </React.Fragment>
      )}

      {orderStatus === RequestStatuses.LOADING && (
        <Box padding={2} flexDirection={'column'} display={'flex'} alignItems={'center'}>
          <Box width={200} component={"img"} src={LoadingImage} />
          <Typography>Ожидаем подтверждения заказа, это может занять некоторое время</Typography>
        </Box>
      )}

      {orderStatus === RequestStatuses.SUCCESS && (
        <Box padding={2} flexDirection={'column'} display={'flex'} alignItems={'center'}>
          <Box width={200} component={"img"} src={SuccessImage} />
          <Typography>Заказ принят, спасибо! :)</Typography>
        </Box>
      )}
      {orderStatus === RequestStatuses.ERROR && (
        <Box padding={2} flexDirection={'column'} display={'flex'} alignItems={'center'}>
          <Box width={200} component={"img"} src={ErrorImage} />
          <Typography>
            Что-то пошло не так как задумывалось :(<br/>
            Повторите попытку позднее, мы все починим</Typography>
        </Box>
      )}
    </Paper>
  );
}
