import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getMe, getVouchers } from '../../../fetches';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    avatarWrapper: {
      // marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    button: {
      marginTop: theme.spacing(2),
    },
    card: {
      // marginTop: theme.spacing(9),
      // marginLeft: theme.spacing(2),
      // marginRight: theme.spacing(2),
    },
    cardList: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    mainAvatar: {
      height: 80,
      width: 80,
      borderRadius: 0,
    },
    chip: {
      marginRight: theme.spacing(1),
    },
    chipWrapper: {
      margin: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-around',
    },
    spinner: {
      marginTop: theme.spacing(20),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const Profile: React.FC<RouteComponentProps> = ({ location, history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(location.state && location.state.open);
  const [data, setData] = React.useState({
    points: 0,
    imageUrl: '',
    name: '',
    level: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [vouchers, setVouchers] = React.useState([]);

  function handleClose() {
    history.replace('/perfil', {});
    setOpen(false);
  }

  const loadData = async () => {
    await getMe().then((r: any) => setData(r.data));
    await getVouchers().then((r: any) => setVouchers(r.data.reverse()));
    setLoading(false);
  };
  React.useEffect(() => {
    loadData();
  }, []);

  const { points, imageUrl, name, level } = data;

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  } else {
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
          <Typography align="center" variant="body1" gutterBottom>
            Muito obrigado por fazer parte da nossa rede do bem! Utilize o menu de catálogo para encontras todos os benefícios que preparamos pra você!
          </Typography>
          <Divider variant="middle" />
          <div className={classes.chipWrapper}>
            <Chip
              className={classes.chip}
              color="secondary"
              label={`Pontos: ${points}`}
            />
            <Chip
              className={classes.chip}
              color="secondary"
              label={`Nivel de doador: ${level}`}
            />
          </div>
        </Card>
        {vouchers.length > 0 && open && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Parabens pelo voucher
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {(vouchers as any)[0].product.name} - Código: {(vouchers as any)[0].code}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Button
          onClick={() => history.push('/comprovante')}
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          ADICIONAR COMPROVANTE DE DOAÇÃO
        </Button>

        {vouchers.map((v: any) => (
          <Card key={v._id} className={classes.cardList}>
            <CardHeader
              avatar={
                <Avatar
                  className={classes.mainAvatar}
                  alt="Remy Sharp"
                  src={v.product.imageUrl}
                />
              }
              title={`${v.product.name} - Código: ${v.code}`}
              subheader={`Expira em: ${new Intl.DateTimeFormat('pt').format(new Date(v.expiresAt))}`}
            />
          </Card>
        ))}
      </div>
    );
  }
};

export default withRouter(Profile);
