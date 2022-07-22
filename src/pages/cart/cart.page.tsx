import {HeaderComponent} from "../../components/common/header/header.component";
import {Box, Grid, Toolbar, Typography} from "@mui/material";
import {CartViewComponent} from "./components/cart-view.component";
import {OrderFormComponent} from "./components/order-form.component";
import {useWindowDimensions} from "../../hooks/window.hook";
import {UserProfileComponent} from "./components/user-profile.component";

export function CartPage () {
  const windowSize = useWindowDimensions();
  console.log(windowSize.height);
  return (
    <Box sx={{display: 'flex', backgroundColor: '#f7f8f9', height: '150%' }}>
      <HeaderComponent />

      <Box component="main" sx={{ height: windowSize.height, padding: 0, margin: 0, flexGrow: 1, p: 3 }}>
        <Toolbar/>

        <Typography margin={1} variant={'h4'} component={'div'}>Корзина</Typography>
        <Box>
          <Grid container>
            <Grid item xs={8}>
              <Box margin={1}>
                <CartViewComponent />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box margin={1}>
                <UserProfileComponent />
              </Box>

              <Box margin={1}>
                <OrderFormComponent />
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Box>
    </Box>
  );
}