import {Box} from "@mui/material";
import BadRequestImage from '../../static/400.png';

interface Error400PageProps {
  message?: string;
  description?: string;
}

export function Error400Page (props: Error400PageProps) {
  return (
    <Box>
      <Box component={'img'} src={BadRequestImage} />
    </Box>
  );
}