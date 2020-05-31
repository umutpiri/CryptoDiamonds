import React from 'react';
import { Switch, BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MainPage from './pages/MainPage';
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';
import MetaMaskLoginButton from './components/MetaMaskLoginButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const metaMaskLogin = () => {
  console.log("LOGIN")
}




const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <div>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/" style={{color: '#FFF'}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
            Menu
          </Typography>
          <Button color="inherit">L</Button>
          <MetaMaskLoginButton login={metaMaskLogin}/>
        </Toolbar>
      </AppBar>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/itemPage" component={ItemPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
