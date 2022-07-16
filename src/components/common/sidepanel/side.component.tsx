import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {selectCategoriesList, selectCategoriesRequestStatus} from "../../../store/catalog/catalog.slice";
import {
  Drawer,
  Typography,
  Toolbar,
  Box,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Link,
  Collapse,
  Tooltip,
  Alert, IconButton
} from "@mui/material";
import {getDrawerWidth} from "../../../store/utils";
import {useLocation, Link as RouterLink} from "react-router-dom";
import {RequestStatuses} from "../../../interfaces/common/request-statuses.enum";
import {CategoryInterface} from "../../../interfaces/category.interface";
import {ExpandLess, ExpandMore, Category as CategoryIcon} from "@mui/icons-material";
import {requestCategories} from "../../../store/catalog/catalog.api";

export function SideComponent () {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const dispatch = useAppDispatch();
  const categoriesRequestStatus = useAppSelector(selectCategoriesRequestStatus);
  const categoriesList = useAppSelector(selectCategoriesList);
  const drawerWidth = getDrawerWidth();
  const location = useLocation();

  useEffect(() => {
    if (categoriesRequestStatus === RequestStatuses.IDLE) dispatch(requestCategories());
  })

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
      }}
    >
      <Toolbar/>
      <Box sx={{overflow: 'auto'}}>
        {/* CATALOG & STORE */}
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper'
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">Каталог</ListSubheader>
          // }
        >

          {/*<ListItemButton*/}
          {/*  disabled={true}*/}
          {/*  key={'home'}*/}
          {/*  selected={location.pathname === '/'}*/}
          {/*  component={RouterLink}*/}
          {/*  to={'/'}*/}
          {/*>*/}
          {/*  <ListItemIcon>*/}
          {/*    <HomeIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Главная" />*/}
          {/*</ListItemButton>*/}

          {/*<ListItemButton*/}
          {/*  disabled={true}*/}
          {/*  key={'sales'}*/}
          {/*  selected={location.pathname === '/sales'}*/}
          {/*  component={RouterLink}*/}
          {/*  to={'/sales'}*/}
          {/*>*/}
          {/*  <ListItemIcon>*/}
          {/*    <PercentIcon />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Акции" />*/}
          {/*</ListItemButton>*/}

          <ListItemButton
            key={'categories'}
            selected={location.pathname === '/categories'}
            component={RouterLink}
            to={'/categories'}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Категории" />
            <IconButton size={'small'} onClick={() => setCategoriesOpen(!categoriesOpen)}>
              {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemButton>

          <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categoriesRequestStatus === RequestStatuses.SUCCESS && categoriesList.map((e: CategoryInterface) =>
                <Tooltip key={e.id+e.name} title={e.description}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={RouterLink}
                    to={`/category?id=${e.id}`}
                    selected={location.pathname === '/category' && location.search === `?id=${e.id}`}
                  >
                    <ListItemText primary={e.name} />
                  </ListItemButton>
                </Tooltip>
              )}

              {categoriesRequestStatus === RequestStatuses.ERROR && (
                <Alert
                  severity={'error'}
                  sx={{
                    width: drawerWidth - 20,
                    margin: '10px',
                  }}
                >
                  <Typography>Ой, ошибка!</Typography>
                  <Typography variant={'body2'}>
                    Не удалось загрузить категории,
                    <Link onClick={() => dispatch(requestCategories())}>
                      нажмите здесь
                    </Link> чтобы повторить попытку
                  </Typography>
                </Alert>
              )}
            </List>
          </Collapse>

        </List>
      </Box>
    </Drawer>
  );
}
