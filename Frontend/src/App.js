import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import ItemPage from "./pages/ItemPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersPage from "./pages/OffersPage";
import BrowseAllItems from "./pages/BrowseAllItems";
import Header from "./components/Header";

const backend = "http://localhost:8181";

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
      user: {},
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios
      .post(backend + "/user/get", { username: "umut" })
      .then((res) => {
        console.log(res.data);
        if (res.data) this.setState({ user: res.data });
      })
      .catch((err) => console.log(err));
  }

  login(user) {
    this.setState({ user: user });
  }

  logout() {
    this.setState({ user: {} });
  }

  render() {
    const classes = this.props;
    return (
      <Router>
        <div>
          <Header user={this.state.user} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <MainPage user={this.state.user} {...props} />}
            />
            <Route
              path="/login"
              render={(props) => <LoginPage login={this.login} {...props} />}
            />
            <Route
              path="/register"
              render={(props) => (
                <RegisterPage register={this.register} {...props} />
              )}
            />
            <Route
              path="/itemPage/:id"
              render={(props) => (
                <ItemPage id={props.match.params.id}></ItemPage>
              )}
            />
            <Route
              path="/profile/:username"
              render={(props) => (
                <ProfilePage
                  username={props.match.params.username}
                  loggedInUser={this.state.user}
                />
              )}
            />
            <Route path="/offers" component={OffersPage} />
            <Route
              path="/browseItems"
              render={(props) => (
                <BrowseAllItems username={this.state.user.username} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(useStyles)(App);
