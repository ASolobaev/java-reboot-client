import {
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
import {getAppName} from "../../../store/utils";

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

      </Toolbar>
    </AppBar>
  );
}
