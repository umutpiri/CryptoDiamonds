import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import MainPage from "./pages/MainPage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "test",
    };
  }

  render() {
    const classes = this.props;
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/itemPage" component={ItemPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(useStyles)(App);
