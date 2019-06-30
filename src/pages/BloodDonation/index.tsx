import React, { useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import Webcam from "react-webcam";
import { Button } from '@material-ui/core';
import { postBloodDonation } from '../../fetches';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

const Item: React.FC<RouteComponentProps> = ({ match, history }) => {
  const classes = useStyles();
  const webcam = useRef(null);
  const [picture, setPicture] = useState(null);
  const [pageState, setPageState] = useState("webcam");
  const [sendingPicture, setSendingPicture] = useState(false);

  React.useEffect(() => {
    console.log(match.params);
  }, []);

  const takePicture = () => {
    const imageSrc = (webcam as any).current.getScreenshot();
    setPicture(imageSrc);
    setPageState("picture");
    console.log(imageSrc);
  }

  const sendPicture = async () => {
    setSendingPicture(true);
    await postBloodDonation({
      image: picture
    });
    setSendingPicture(false);
    setPageState("success");
  }

  return (
    <div className={classes.wrapper}>
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
            Comprovante
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <p>
          Obrigado por colaborar com a manutenção da vida de dezenas de pessoas!
        </p>
        <p>
          Envie uma foto do comprovante de doação e ganhe 50 pontos!
        </p>
      </div>

      {({
        "webcam": (
          <>
            <Webcam
              ref={webcam}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />

            <Button onClick={takePicture} variant="contained" color="primary" fullWidth>
              Tirar foto
          </Button>
          </>
        ),
        "picture": (
          <>
            <img src={picture!} />
            <Button onClick={sendPicture} disabled={sendingPicture} variant="contained" color="primary" fullWidth>
              {sendingPicture ? "Enviando..." : "Enviar foto"}
            </Button>
          </>
        ),
        "success": (
          <div>
            <p>Comprovante enviado!</p>
            <Button onClick={takePicture} color="primary" fullWidth>
              Ver onde posso usar meus pontos!
            </Button>
          </div>
        )
      } as { [key: string]: JSX.Element })[pageState]}
    </div>
  );
};

export default Item;
