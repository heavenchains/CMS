const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/db");
const User = require("../models/User");
const { objectWithoutKey } = require("../helpers/GlobalHelper");

router.get("/", (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .then(data => res.json({ msg: "User has been deleted successfully!" }))
    .catch(err => res.json({ error: err.messahe }));
});

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const permissions = req.body.permissions;

  if ((username, email, password, role, permissions)) {
    User.getUserByUsername(username, (err, user) => {
      if (err) res.json({ error: err.message });
      if (!user) {
        User.getUserByEmail(email, (err, user) => {
          if (err) res.json({ error: err.message });
          if (!user) {
            let newUser = User({
              username: req.body.username,
              email: req.body.email,
              avatar: req.body.avatar,
              password: req.body.password,
              role: req.body.role,
              permissions: req.body.permissions
            });

            User.addUser(newUser, (err, user) => {
              if (err) {
                res.json({ error: error.message });
              } else {
                res.json({
                  msg: "User registered successfully!",
                  user: user
                });
              }
            });
          } else {
            res.json({
              msg: "User already exists with the same email address"
            });
          }
        });
      } else {
        res.json({ msg: "User already exists with the same username" });
      }
    });
  } else {
    res.json({ msg: "There is one or more fields are not defined" });
  }
});

router.post("/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) res.json({ error: err.message });
    if (!user) {
      return res.json({ msg: "User not found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // in a week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            permissions: user.permissions
          }
        });
      } else {
        return res.json({ success: false, msg: "Wrong Password" });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      user: req.user
    });
  }
);

module.exports = router;
