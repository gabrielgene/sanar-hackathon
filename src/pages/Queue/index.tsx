import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Heart } from '../../heart.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: '100%',
      maxHeight: '17vh',
    },
    car: {
      width: theme.spacing(22.5),
    },
    carWrapper: {
      display: 'flex',
      justifyContent: 'center',
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
      marginTop: theme.spacing(4),
    },
  }),
);

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [queue, setQueue] = React.useState(false);

  React.useEffect(() => {
    const googleId = localStorage.getItem('googleId');
    if (googleId) {
      setQueue(true);
    }
  }, []);

  const onSuccessGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline | any,
  ) => {
    const { profileObj } = response;
    const data = await (await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileObj),
    })).json();
    console.log(data, profileObj);
    localStorage.setItem('googleId', profileObj.googleId);
    setQueue(true);
  };

  function onFailureGoogle(response: GoogleLoginResponse) {
    console.log(response);
  }

  return (
    <div>
      <img
        className={classes.img}
        src="https://i.imgur.com/UJRuonc.png"
        alt="Header"
      />
      <div className={classes.root}>
        <p className={classes.text}>
          Se inscreva na nossa <strong>lista de espera</strong>.
        </p>
        <div className={classes.iconWrapper}>
          <Heart className={classes.icon} />
        </div>
        <p className={classes.text}>
          Entrando com sua conta do Google você fará parte da comunidade{' '}
          <strong>Vidare</strong>, tendo acesso a um clube exclusivos de
          vantagens, descontos e oportunidades únicas.
        </p>
        <div className={classes.carWrapper}>
          <img
            className={classes.car}
            src="https://i.imgur.com/tWpO9R0.png"
            alt="Car"
          />
        </div>
        <GoogleLogin
          clientId="1067529242631-akp71a0lp6617a34042jiso66nnhvudk.apps.googleusercontent.com"
          buttonText="Entrar com o Google"
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          disabled={queue}
          cookiePolicy={'single_host_origin'}
          render={(renderProps: any) => (
            <Button
              className={classes.button}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              color="primary"
              fullWidth
            >
              {queue ? 'você está na fila de espera' : 'ENTRAR COM O GOOGLE'}
            </Button>
          )}
        />
      </div>
    </div>
  );
};
export default Login;
