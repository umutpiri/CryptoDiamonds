const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
var cors = require("cors");
const app = express();
app.use(cors());
const PORT = 8181;
// Route requires
const user = require("./routes/user");
const { CreateArgs, HuDeX } = require("./hudex");
const Diamond = require("./database/models/diamond");
const User = require("./database/models/user");

const bdy_id = "340282366920938463463374607431768211456";
const developer_addr = "0xbfBF7885938E4Eb53cc95411720A51F030294945";

var hudex = new HuDeX(developer_addr, 0, 0);

// MIDDLEWARE
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "kbdpet", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Diamond
// get diamonds of specified username or sender
app.get("/diamond/get", (req, res) => {
  var username = req.body.username;
  if (req.body.username) username = req.body.username;
  Diamond.find({ owner: username }, (err, diamonds) => {
    res.json(diamonds);
  });
});

// get diamond by id
app.post("/diamond", (req, res) => {
  Diamond.findOne({ id: req.body.id }, (err, diamond) => {
    console.log(diamond);
    res.json(diamond);
  });
});

app.post("/diamond/create", (req, res) => {
  console.log("DIAMOND CREATE");
  var color = getRandomColor();
  console.log(color);
  hudex
    .createAndMint({
      name: color,
      is_nf: true,
      img: "https://g.hizliresim.com/beyaz-lamborghini",
    })
    .then((data) => {
      console.log(data);
      if (data.mint == true) {
        const newDiamond = new Diamond({
          id: data.tokenId,
          color: color,
          owner: req.body.username,
        });
        newDiamond.save((err, savedDiamond) => {
          User.findOne({ username: req.body.username }, (err, user) => {
            user.diamonds.push(savedDiamond);
            user.save(async (err, savedUser) => {
              await savedUser.populate("diamonds").execPopulate();
              res.json(savedUser);
            });
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/diamond/buy", (req, res) => {
  var diamondId = req.body.id;
  Diamond.findOne({ id: diamondId }, (err, diamond) => {
    if (!diamond.is_sale) {
      res.send("diamond is not sale").status(400);
    }
    User.findOne({ username: req.body.username }, (err, buyer) => {
      if (buyer.coin < diamond.price) {
        res.send("not enough coin").status(400);
      }
      User.findOne({ username: diamond.owner }, async (err, seller) => {
        seller.diamonds.splice(
          seller.diamonds.findIndex((item) => item.id === diamondId),
          1
        );
        seller.coin += diamond.price;
        buyer.coin -= diamond.price;
        diamond.is_sale = false;
        diamond.owner = buyer.username;
        buyer.diamonds.push(diamond);
        await diamond.save();
        await seller.save();
        await buyer.save();
        res.json(diamond);
      });
    });
  });
});

app.post("/diamond/sell", (req, res) => {
  var diamondId = req.body.id;
  var price = req.body.price;
  Diamond.findOne({ id: diamondId }, (err, diamond) => {
    diamond.is_sale = true;
    diamond.price = price;
    diamond
      .save()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  });
});

app.post("/diamond/cancel-sell", (req, res) => {
  var diamondId = req.body.id;
  Diamond.findOne({ id: diamondId }, (err, diamond) => {
    diamond.is_sale = false;
    diamond
      .save()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  });
});

app.get("/diamond/best-seller", (req, res) => {
  Diamond.find({ is_sale: true }, (err, diamonds) => {
    const shuffled = diamonds.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);
    res.json(selected);
  });
});

app.get("/diamond/get-sales", (req, res) => {
  Diamond.find({ is_sale: true }, (err, diamonds) => {
    res.json(diamonds);
  });
});

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function sumHex(hex1, hex2) {
  rgb1 = hexToRgb(hex1);
  rgb2 = hexToRgb(hex2);

  r = rgb1.r + rgb2.r > 255 ? 255 : rgb1.r + rgb2.r;
  g = rgb1.g + rgb2.g > 255 ? 255 : rgb1.g + rgb2.g;
  b = rgb1.b + rgb2.b > 255 ? 255 : rgb1.b + rgb2.b;

  return rgbToHex(r, g, b);
}

app.post("/diamond/merge", (req, res) => {
  var firstId = req.body.firstId;
  var secondId = req.body.secondId;
  Diamond.findOne({ id: firstId }, (err, firstDiamond) => {
    Diamond.findOne({ id: secondId }, (err, secondDiamond) => {
      const owner = firstDiamond.owner;
      User.findOne({ username: owner }, (err, user) => {
        var newColor = sumHex(firstDiamond.color, secondDiamond.color);
        hudex
          .createAndMint({
            name: newColor,
            is_nf: true,
            img: "https://g.hizliresim.com/beyaz-lamborghini",
          })
          .then((data) => {
            const newDiamond = new Diamond({
              id: data.tokenId,
              color: newColor,
              owner: owner,
            });
            newDiamond.save((err, savedDiamond) => {
              /*user.diamonds.splice(
                user.diamonds.findIndex((item) => item.id === firstId),
                1
              );
              user.diamonds.splice(
                user.diamonds.findIndex((item) => item.id === secondId),
                1
              );*/
              firstDiamond.remove();
              secondDiamond.remove();
              user.diamonds.push(savedDiamond);
              user
                .save()
                .then((data) => res.json(data))
                .catch((err) => console.log(err));
            });
          })
          .catch((err) => console.log(err));
      });
    });
  });
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

/*hudex
  .createAndMint({
    name: "bdy",
    is_nf: false,
    quantity: 100,
    img: "https://g.hizliresim.com/beyaz-lamborghini",
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));*/
/*
hudex
  .balanceOf("0xbfBF7885938E4Eb53cc95411720A51F030294945", bdy_id)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

hudex
  .transfer(
    "0xca60625eAd9950dB35595787e519AC28Ea3D59Ee",
    "0xbfBF7885938E4Eb53cc95411720A51F030294945",
    bdy_id,
    10
  )
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

hudex
  .balanceOf("0xbfBF7885938E4Eb53cc95411720A51F030294945", bdy_id)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

hudex
  .balanceOf("0xca60625eAd9950dB35595787e519AC28Ea3D59Ee", bdy_id)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
*/
