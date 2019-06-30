import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

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

  React.useEffect(() => {
    console.log(match.params);
  }, []);

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
            WTF
          </Typography>
        </Toolbar>
      </AppBar>
      <p>Infos do card</p>
      <p>Resgatar vouchers</p>
      <p>créditos atuais?</p>
    </div>
  );
};

export default Item;
