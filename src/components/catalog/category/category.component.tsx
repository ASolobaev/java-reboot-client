import {CategoryInterface} from "../../../interfaces/category.interface";
import {Button, Card, CardActions, CardMedia} from "@mui/material";
import {getCategoryCardImageSize} from "../../../store/utils";
import {Link as RouterLink} from "react-router-dom";
import CategoryImage from "../../../static/category.image.jpeg";

interface CategoryComponentProps {
  data: CategoryInterface;
  identifier: string;
  useImages?: boolean;
  srcImage?: string;
}

export function CategoryComponent (props: CategoryComponentProps) {

  return (
    <Card
      key={props.identifier}
    >
      {props.useImages && (
        <CardMedia
          sx={{
            backgroundImage: `url(${CategoryImage})`,
            height: getCategoryCardImageSize(),
          }}
        />
      )}

      {/*<CardContent*/}
      {/*  sx={{*/}
      {/*    display: 'flex',*/}
      {/*    alignItems: 'center',*/}
      {/*    width: '100%',*/}
      {/*    padding: 0,*/}
      {/*    height: 70,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Typography variant={'h5'} align={'center'} width={'100%'}>*/}
      {/*    {props.data.name}*/}
      {/*  </Typography>*/}
      {/*</CardContent>*/}

      <CardActions>
        <Button
          sx={{
            width: '100%'
          }}
          component={RouterLink}
          // TODO: добавить ссылку на компонент
          to={`/category?id=${props.data.id}`}
        >
          {props.data.name}
        </Button>
      </CardActions>
    </Card>
  );
}
