import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import UserIcon from "@material-ui/icons/Person";
import { useHistory, Link } from "react-router-dom";

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

const renderLogin = (user) => {
  if (user.name) {
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
            margin: 10,
            borderRadius: 10,
            fontSize: 18,
            marginRight: 35,
          }}
        >
          {user.coin}
          <small style={{ marginLeft: 5 }}>bdy</small>
        </div>
        <Link
          to="/profile"
          style={{
            margin: 10,
            fontSize: 25,
            color: "#FFF",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <UserIcon style={{ fontSize: 25 }} />
          {user.name}
        </Link>
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
};

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();
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

          {renderLogin(props.user)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
