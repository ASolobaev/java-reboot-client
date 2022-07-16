import {
  Box,
  Toolbar
} from "@mui/material";
import {HeaderComponent} from "../../components/common/header/header.component";
import {Outlet} from "react-router-dom";
import {SideComponent} from "../../components/common/sidepanel/side.component";

export function CatalogPage () {
  return (
    <Box sx={{display: 'flex'}}>
      <HeaderComponent />

      <SideComponent />

      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Toolbar/>

        <Outlet />
      </Box>
    </Box>
  );
}
