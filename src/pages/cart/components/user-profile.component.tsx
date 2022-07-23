import {useAppSelector} from "../../../store/app.store";
import {Avatar, Box, Divider, Paper, Typography} from "@mui/material";
import {selectAddress, selectUser} from "../../../store/user/user.slice";
import { Link } from "react-router-dom";

export function UserProfileComponent () {
  const userData = useAppSelector(selectUser);
  const userAddress = useAppSelector(selectAddress);

  return (
    <Paper>
      <Box display={'flex'} alignItems={'center'} padding={2}>
        <Avatar>{userData?.user && userData.user?.firstName.slice(0,1) + userData.user?.lastName.slice(0,1)}</Avatar>
        {userData && (<Typography marginLeft={2}>{userData.user?.fullName}</Typography>)}
        {!userData.id && (<Link to={'/auth'} style={{ cursor: 'pointer', marginLeft: 2 }}><Typography>Авторизация</Typography></Link>)}
      </Box>
      <Divider variant={'middle'} />
      {userData?.id && (
        <Box padding={2}>
          <Typography>Адрес пункта выдачи:</Typography>
          <Typography component={"span"}>{`${userAddress[0].city}, ${userAddress[0].street}, ${userAddress[0].building} ${userAddress[0].apartment ? 'кв. ' + userAddress[0].apartment : ''}`}</Typography>
        </Box>
      )}
    </Paper>
  );
}
