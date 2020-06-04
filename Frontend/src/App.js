import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import ProfilePage from "./pages/ProfilePage";
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
      user: {
        name: "umut",
        coin: 100,
      },
    };
  }

  render() {
    const classes = this.props;
    return (
      <Router>
        <div>
          <Header user={this.state.user} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/itemPage" component={ItemPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(useStyles)(App);
