import {
  Avatar,
  Box, Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText, ListSubheader,
} from "@mui/material";

import {UserDto} from "../../../interfaces/user.dto";
import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {selectUser, setUser} from "../../../store/user/user.slice";
import {Link} from "react-router-dom";

export function MockUserComponent () {

  const mockedUser: UserDto[] = [
    {
      id: 1,
      firstName: 'Иван',
      middleName: 'Иванович',
      lastName: 'Иванов',
      address: [{
        city: 'Лениград',
        street: '3-я улица строителей',
        building: '1',
      }]
    },
    {
      id: 2,
      firstName: 'Олег',
      lastName: 'Олегофф',
      address: [{
        city: 'Москва',
        street: 'Казанская площадь',
        building: '66'
      }]
    }
  ]

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <Box alignItems={'flex-start'}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Выберите пользователя
          </ListSubheader>
        }
      >
        {mockedUser.map((e, index) =>
          <ListItemButton
            selected={user.id === e.id}
            key={e.id+e.lastName+index}
            onClick={() => dispatch(setUser(mockedUser[index]))}
          >
            <ListItemIcon>
              <Avatar>{e.firstName.slice(0,1) + e.lastName.slice(0,1)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={e.firstName} secondary={e.lastName} />
          </ListItemButton>
        )}
      </List>
      <Button
        variant={'contained'}
        fullWidth
        component={Link}
        to={'/cart'}
        color={'success'}
      >
        Вернуться в корзину
      </Button>
    </Box>
  );
}
