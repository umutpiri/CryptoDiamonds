import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Diamond from "./Diamond";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const historyArr = [
  {
    color: "#CCFFDD",
    price: 150,
    user: "test",
    isSold: true,
  },
  {
    color: "#4588D7",
    price: 60,
    user: "müge",
    isSold: false,
  },
  {
    color: "#509B3D",
    price: 20,
    user: "test",
    isSold: false,
  },
  {
    color: "#0834DF",
    price: 40,
    user: "umut2",
    isSold: false,
  },
  {
    color: "#010105",
    price: 10,
    user: "müge",
    isSold: true,
  },
];

const offersSent = [
  {
    color: "#DFAECC",
    price: 135,
    user: "umut2",
    isSold: true,
  },
  {
    color: "#467587",
    price: 55,
    user: "test",
    isSold: false,
  },
  {
    color: "#172809",
    price: 32,
    user: "müge",
    isSold: false,
  },
];

const offersReceived = [
  {
    color: "#133CC4",
    price: 63,
    user: "umut2",
    isSold: true,
  },
  {
    color: "#133CC4",
    price: 65,
    user: "test",
    isSold: false,
  },
  {
    color: "#B25F03",
    price: 45,
    user: "müge",
    isSold: false,
  },
];

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderBottom = () => {
    if (value == 0) {
      const items = historyArr.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: index % 2 == 0 ? "#B0E0E6" : "#F0F8FF",
            alignItems: "center",
          }}
        >
          <Diamond color={item.color} size={50}></Diamond>
          <div style={{ width: 90 }}>{item.color}</div>
          <div style={{ width: 90 }}>{item.price}</div>
          <div style={{ width: 90 }}>{item.user}</div>
          <div style={{ width: 90 }}>{item.isSold ? "sold" : "bought"}</div>
        </div>
      ));
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <div style={{ width: 50 }}></div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Color
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Price
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              User
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Type
            </div>
          </div>
          {items}
        </div>
      );
    } else if (value == 1) {
      const items = offersSent.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: index % 2 == 0 ? "#B0E0E6" : "#F0F8FF",
            alignItems: "center",
          }}
        >
          <Diamond color={item.color} size={50}></Diamond>
          <div style={{ width: 90 }}>{item.color}</div>
          <div style={{ width: 90 }}>{item.price}</div>
          <div style={{ width: 90 }}>{item.user}</div>
          <div
            style={{
              backgroundColor: "#C51162",
              borderRadius: 7,
              padding: 5,
              cursor: "pointer",
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: 30,
            }}
            onClick={() => this.props.cancelSell(this.props.id)}
          >
            Cancel
          </div>
        </div>
      ));
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <div style={{ width: 50 }}></div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Color
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Price
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              User
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Action
            </div>
          </div>
          {items}
        </div>
      );
    } else {
      const items = offersReceived.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: index % 2 == 0 ? "#B0E0E6" : "#F0F8FF",
            alignItems: "center",
          }}
        >
          <Diamond color={item.color} size={50}></Diamond>
          <div style={{ width: 90 }}>{item.color}</div>
          <div style={{ width: 90 }}>{item.price}</div>
          <div style={{ width: 90 }}>{item.user}</div>
          <div style={{ display: "flex", flexDirection: "row", width: 180 }}>
            <div
              style={{
                backgroundColor: "#32CD32",
                borderRadius: 7,
                padding: 5,
                cursor: "pointer",
                paddingLeft: 10,
                paddingRight: 10,
                marginRight: 30,
              }}
              onClick={() => this.props.cancelSell(this.props.id)}
            >
              Accept
            </div>
            <div
              style={{
                backgroundColor: "#C51162",
                borderRadius: 7,
                padding: 5,
                cursor: "pointer",
                paddingLeft: 10,
                paddingRight: 10,
                marginRight: 30,
              }}
              onClick={() => this.props.cancelSell(this.props.id)}
            >
              Reject
            </div>
          </div>
        </div>
      ));
      return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <div style={{ width: 50 }}></div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Color
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              Price
            </div>
            <div style={{ width: 90, fontWeight: "bold", fontSize: 25 }}>
              User
            </div>
            <div
              style={{
                width: 180,
                fontWeight: "bold",
                fontSize: 25,
                paddingLeft: 40,
              }}
            >
              Action
            </div>
          </div>
          {items}
        </div>
      );
    }
  };

  return (
    <div style={{ marginTop: 50, marginBottom: 70 }}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="History" />
          <Tab label="Offers Sent" />
          <Tab label="Offers Received" />
        </Tabs>
      </Paper>
      {renderBottom()}
    </div>
  );
}
