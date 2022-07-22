import {useAppDispatch, useAppSelector} from "../../../store/app.store";
import {Avatar, Box, Button, Divider, Link, Paper, Typography} from "@mui/material";
import {selectAddress, selectUser, setUser} from "../../../store/user/user.slice";

export function UserProfileComponent () {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);
  const userAddress = useAppSelector(selectAddress);

  return (
    <Paper>
      <Box display={'flex'} alignItems={'center'} padding={2}>
        <Avatar />
        {userData && (<Typography marginLeft={2}>{userData.user?.fullName}</Typography>)}
        {!userData.id && (<Link sx={{ cursor: 'pointer' }} marginLeft={2}><Typography>Авторизация</Typography></Link>)}
      </Box>
      <Divider />
      {userData?.id && (
        <Box>
          <Typography>Адрес доставки:</Typography>
          <Typography component={"span"}>{`${userAddress[0].city}, ${userAddress[0].street}, ${userAddress[0].building} ${userAddress[0].apartment || ''}`}</Typography>
        </Box>
      )}
    </Paper>
  );
}