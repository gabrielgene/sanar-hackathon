import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    spinner: {
      marginTop: theme.spacing(20),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
const Start: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProducts().then(p => {
      p.data && setValues(p.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {values.map((i: Product) => (
        <Card
          className={classes.card}
          key={i._id}
          onClick={() => history.push(`item/${i._id}`, { product: i })}
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
  );
};

export default withRouter(Start);
