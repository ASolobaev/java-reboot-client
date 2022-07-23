import {Box, Divider, Paper, Typography} from "@mui/material";
import {useWindowDimensions} from "../../hooks/window.hook";
import {Link} from "react-router-dom";
import {getAppName} from "../../store/utils";
import {MockUserComponent} from "../../components/common/user/mock-user.component";

export function AuthPage () {
  const windowSize = useWindowDimensions();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: windowSize.width,
        height: windowSize.height,
        padding: 20,
        border: '1px solid black'
      }}
    >
      <Paper
        sx={{
          padding: 4,
          height: '50%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box>
          <Link to={'/'} style={{ textDecoration: 'none' , color: 'inherit', cursor: 'pointer' }}><Typography variant={'h5'}>{getAppName()}</Typography></Link>
        </Box>
        <Divider sx={{ margin: 2 }} orientation={'vertical'} />
        <MockUserComponent />
      </Paper>
    </Box>
  );
}
