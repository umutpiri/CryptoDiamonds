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
    user: "müge",
    isSold: false,
  },
  {
    color: "#010105",
    price: 10,
    user: "müge",
    isSold: true,
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
      return <div>BOTTOM 2</div>;
    } else {
      return <div>BOTTOM 3</div>;
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
