import {Avatar, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../store/app.store";
import {selectUser} from "../../../store/user/user.slice";

export function UserBubbleComponent () {
  const userData = useAppSelector(selectUser);

  return (
    <IconButton
      size={'small'}
    >
      <Link style={{ textDecoration: "none" }} to={'/auth'}><Avatar>{userData?.user && userData.user?.firstName.slice(0,1) + userData.user?.lastName.slice(0,1)}</Avatar></Link>
    </IconButton>
  );
}
