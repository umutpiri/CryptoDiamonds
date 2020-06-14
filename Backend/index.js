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
  var username = req.user.username;
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
          owner: req.user.username,
        });
        newDiamond.save((err, savedDiamond) => {
          User.findOne({ username: req.user.username }, (err, user) => {
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
    User.findOne({ username: req.user.username }, (err, buyer) => {
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
