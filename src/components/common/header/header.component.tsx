import {
  AppBar, Box, Stack,
  Toolbar,
  Typography
} from "@mui/material";
import {getAppName} from "../../../store/utils";
import {CartBubbleComponent} from "../cart/cart.component";
import {UserBubbleComponent} from "../user/user.component";

export function HeaderComponent () {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" noWrap component="div">
          {getAppName()}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <CartBubbleComponent />
          <UserBubbleComponent />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
