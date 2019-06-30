import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ProfileIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SchoolIcon from '@material-ui/icons/School';
import LocalIcon from '@material-ui/icons/LocalActivity';
import { RouteComponentProps } from 'react-router-dom';
import Start from './Start';
import Profile from './Profile';
import Learn from './Learn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navigation: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '0 0 0px 2px #8888881f',
    },
    wrapper: {
      marginTop: theme.spacing(7),
      paddingBottom: theme.spacing(7),
    },
  }),
);

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('/inicio');

  React.useEffect(() => {
    const { pathname } = history.location;
    setValue(pathname);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {value.split('/')[1].replace(/\b\w/g, l => l.toUpperCase())}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.wrapper}>
        {value === '/catalogo' && <Start />}
        {value === '/perfil' && <Profile />}
        {value === '/aprenda' && <Learn />}
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          history.push(newValue);
        }}
        showLabels
        className={classes.navigation}
      >
        <BottomNavigationAction
          value="/catalogo"
          label="Catálogo"
          icon={<LocalIcon />}
        />
        <BottomNavigationAction
          value="/perfil"
          label="Perfil"
          icon={<ProfileIcon />}
        />
        {/* <BottomNavigationAction
          value="/aprenda"
          label="Aprenda"
          icon={<SchoolIcon />}
        /> */}
      </BottomNavigation>
    </div>
  );
};

export default Home;
