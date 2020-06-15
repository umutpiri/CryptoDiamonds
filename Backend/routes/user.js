const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

const wallets = [
  {
    public: "0x3eac84C9598b70D6521026690640Cb51d7df1E32",
    private: "cc3b0cab8b5c47a3386372fa05dcb7074c7d0111e8d2202d12e874533f6d2ccd",
  },
  {
    public: "0xfcC3Ce738d211AC07cca5EfC51E234659d56E24E",
    private: "9c45ac53832a8ace715e33c843015b0da4caf8ad64f5ea21913e896231ac78d8",
  },
  {
    public: "0x9f1156a05Eef5Be7c8c7437cF64422F995f48de0",
    private: "dcb70a2157082407011b6e6f5780e6b9bb219f2a28ceca0c926b20936f72e608",
  },
];

var count = 0;

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, email } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
        email: email,
        coin: 100,
        public: wallets[count].public,
        private: wallets[count].private,
      });
      count += 1;
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});
/*
router.post(
  "/login",
  function (req, res, next) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username,
    };
    User.findOne({ username: req.user.username }, (err, user) => {
      res.json({ user });
    });
  }
);*/

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    await user.populate("diamonds").execPopulate();
    res.json(user);
  });
});

router.post("/get", (req, res) => {
  console.log("*********************");
  console.log(req.body);
  console.log("*********************");
  User.findOne({ username: req.body.username }, async (err, user) => {
    await user.populate("diamonds").execPopulate();
    res.json(user);
  });
});

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  if (req.body) {
    User.findOne({ username: req.body.username }, (err, user) => {
      res.json({ user });
    });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
