import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { getMe, getVouchers } from '../../../fetches';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarWrapper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    card: {
      marginTop: theme.spacing(9),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    chip: {
      marginRight: theme.spacing(1),
    },
    chipWrapper: {
      margin: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-around',
    },
  }),
);

const Profile: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    points: 0,
    imageUrl: '',
    name: '',
    level: 0,
  });

  const [vouchers, setVouchers] = React.useState([]);

  // product: Product
  // expiresAt: Date
  // code: string
  React.useEffect(() => {
    getMe().then((r: any) => setData(r.data));
    getVouchers().then((r: any) => setVouchers(r.data));
  }, []);

  const { points, imageUrl, name, level } = data;

  console.log(vouchers);
  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.avatarWrapper}>
          <Avatar
            alt="Remy Sharp"
            src={imageUrl}
            className={classes.bigAvatar}
          />
        </div>
        <Typography align="center" variant="h5" gutterBottom>
          {name}
        </Typography>
        <Divider variant="middle" />
        <div className={classes.chipWrapper}>
          <Chip className={classes.chip} label={`Pontos: ${points}`} />
          <Chip className={classes.chip} label={`Level de doador: ${level}`} />
        </div>
      </Card>

      {vouchers.map(({ product, expiresAt, code, _id }) => (
        <Card key={_id}>Voucher</Card>
      ))}
    </div>
  );
};

export default Profile;
