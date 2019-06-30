import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getProducts } from '../../../fetches';

interface Product {
  _id: string;
  imageUrl: string;
  company: { name: string };
  name: string;
  discount: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      margin: theme.spacing(1),
    },
    card: {
      width: '46%',
      margin: '2%',
      position: 'relative',
      cursor: 'pointer',
    },
    media: {
      height: 140,
    },
    button: {
      position: 'absolute',
      textTransform: 'capitalize',
      top: 'unset',
      bottom: 0,
      color: 'white',
    },
  }),
);
const Start: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState([]);

  React.useEffect(() => {
    getProducts().then(p => p.data && setValues(p.data));
  }, []);

  console.log(values);
  return (
    <>
      <div>Colocar nome da pessoa, numero de pontos dela e nivel</div>
      <div className={classes.root}>
        {values.map((i: Product) => (
          <Card
            className={classes.card}
            key={i._id}
            onClick={() => history.push(`item/${i._id}`)}
          >
            <CardMedia
              className={classes.media}
              image={i.imageUrl}
              title="Contemplative Reptile"
            />
            <Button color="default" fullWidth className={classes.button}>
              {i.name} - {i.discount}%
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};

export default withRouter(Start);
