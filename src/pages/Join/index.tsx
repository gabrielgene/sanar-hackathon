import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Charity } from '../../charity.svg';
import { ReactComponent as Heart } from '../../heart.svg';
import { postAuth } from '../../fetches';

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
  const onSuccessGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline | any,
  ) => {
    const { profileObj } = response;
    const { data } = await postAuth(profileObj);
    localStorage.setItem('token', data.token);
    history.push('/catalogo');
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
          Além de salvar vidas doando sangue, plaquetas, medula óssea, plasma e
          leite materno, você agora pode participar de nosso clube exclusivo de
          descontos e vantagens para doadores.
        </p>
        <div className={classes.iconWrapper}>
          <Charity className={classes.icon} />
        </div>
        <p className={classes.text}>
          Sua <strong>doação</strong> pode fazer diferença.
        </p>
        <GoogleLogin
          clientId="1067529242631-akp71a0lp6617a34042jiso66nnhvudk.apps.googleusercontent.com"
          buttonText="Entrar com o Google"
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
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
              ENTRAR COM O GOOGLE
            </Button>
          )}
        />
      </div>
    </div>
  );
};
export default Login;
