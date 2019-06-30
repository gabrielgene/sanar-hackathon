import React, { useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import QrReader from 'react-qr-reader'
import { Button } from '@material-ui/core';
import { postRedeem } from '../../fetches';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  const [pageState, setPageState] = useState("webcam");

  React.useEffect(() => {
    console.log(match.params);
  }, []);

  const handleScan = async (data: string | null) => {
    if (!data) {
      return;
    }
    const qrcode = await postRedeem({ code: data });
    if (qrcode) {
      setPageState("success");
    }
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
          <QrReader
            delay={300}
            onError={console.log}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        ),
        "success": (
          <div>
            <p>Voucher processado com sucesso!</p>
            <Button onClick={() => null} color="primary" fullWidth>
              Voltar
            </Button>
          </div>
        )
      } as { [key: string]: JSX.Element })[pageState]}
    </div>
  );
};

export default Item;
