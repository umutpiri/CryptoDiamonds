import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import UserIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const backend = "http://localhost:8181";

const styles = (theme) => ({
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogin = this.renderLogin.bind(this);
  }

  renderLogin(user) {
    if (user.username) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: 15,
              borderRadius: 10,
              fontSize: 18,
              marginRight: 35,
            }}
          >
            {user.coin}
            <small style={{ marginLeft: 5 }}>bdy</small>
          </div>
          <Link
            to={"/profile/" + user.username}
            style={{
              margin: 10,
              fontSize: 25,
              color: "#FFF",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <UserIcon style={{ fontSize: 25, margin: 5 }} />
            {user.username}
          </Link>
          <IconButton
            edge="start"
            onClick={() => {
              axios
                .post(backend + "/user/logout")
                .then((res) => {
                  this.props.logout();
                  window.location.href = "/";
                })
                .catch((err) => console.log(err));
            }}
            color="inherit"
            aria-label="menu"
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login" style={{ color: "#FFF", margin: 5 }}>
          Login
        </Link>
        /
        <Link to="/register" style={{ color: "#FFF", margin: 5 }}>
          Register
        </Link>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => history.push("/")}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" style={{ color: "#FFF" }}>
                Crypto Diamonds
              </Link>
            </Typography>
            {this.renderLogin(this.props.user)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
