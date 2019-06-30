import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import ScoreIcon from '@material-ui/icons/Score';
import DomainIcon from '@material-ui/icons/Domain';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postVoucher } from '../../fetches';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    wrapper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    card: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    mainAvatar: {
      height: 80,
      width: 80,
      borderRadius: 0,
    },
    itemAvatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

interface MatchParams {
  id: string;
}

const Item: React.FC<RouteComponentProps<MatchParams>> = ({
  history,
  location,
}) => {
  const {
    name,
    imageUrl,
    points,
    price,
    discount,
    company,
    _id,
  } = location.state.product;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    postVoucher({ productId: _id }).then(r => history.push('/perfil'));
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => history.goBack()}
            color="inherit"
            aria-label="Menu"
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.mainAvatar}
                alt="Remy Sharp"
                src={imageUrl}
              />
            }
            title={name}
          />
        </Card>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.itemAvatar} alt="Remy Sharp">
                <DomainIcon />
              </Avatar>
            }
            title={`Parceiro: ${company.name}`}
          />
        </Card>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.itemAvatar} alt="Remy Sharp">
                <ScoreIcon />
              </Avatar>
            }
            title={`Essa oferta custa ${points} pontos`}
          />
        </Card>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.itemAvatar} alt="Remy Sharp">
                <MoneyOffIcon />
              </Avatar>
            }
            title={`Desconto de ${discount}%`}
          />
        </Card>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.itemAvatar} alt="Remy Sharp">
                <MoneyIcon />
              </Avatar>
            }
            title={`R$ ${(price / 100).toFixed(2)}`}
          />
        </Card>
        <Button
          className={classes.button}
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          fullWidth
        >
          ADQUIRIR VOUCHER
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja realmente gerar esse voucher?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você possui o 1000 pontos, essa ação irá consumir 10 pontos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Gerar Voucher
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Item;
