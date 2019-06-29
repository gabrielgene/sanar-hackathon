import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Charity } from '../../charity.svg';
import { ReactComponent as Heart } from '../../heart.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: '100%',
      maxHeight: '17vh',
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      color: theme.palette.primary.main,
    },
    monte: {
      fontFamily: 'Monteserrat, sans-serif;',
    },
    title: {
      color: '#444F5D',
      fontWeight: 'lighter',
      textAlign: 'center',
      marginTop: theme.spacing(1),
    },
    text: {
      fontFamily: 'Poppins, sans-serif;',
      fontWeight: 'lighter',
      fontSize: theme.spacing(2) + 2,
      color: '#444F5D',
      textAlign: 'center',
    },
    poppins: {
      fontFamily: 'Poppins, sans-serif;',
    },
    root: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  return (
    <div>
      <img
        className={classes.img}
        src="https://i.imgur.com/UJRuonc.png"
        alt="Header"
      />
      <h1 className={classes.title}>
        <span className={classes.monte}>Vida</span>
        <span className={classes.poppins}>re</span>
      </h1>
      <div className={classes.root}>
        <p className={classes.text}>
          Nosso propósito é impactar a sociedade salvando vidas.
        </p>
        <div className={classes.iconWrapper}>
          <Heart className={classes.icon} />
        </div>
        <p className={classes.text}>
          Além de salvar vidas, você agora pode participar de nosso clube
          exclusivo de descontos e vantagens para doadores.
        </p>
        <div className={classes.iconWrapper}>
          <Charity className={classes.icon} />
        </div>
        <p className={classes.text}>
          Sua <strong>doação</strong> pode fazer diferença.
        </p>
        <Button
          className={classes.button}
          onClick={() => history.push('/participar')}
          variant="contained"
          color="primary"
          fullWidth
        >
          QUERO PARTICIPAR AGORA
        </Button>
      </div>
    </div>
  );
};
export default Login;
