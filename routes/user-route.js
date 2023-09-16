const express = require("express");
const User = require("../models/user-model");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "..", "views", "index.html");
  res.sendFile(htmlPath);
});



router.post("/signup", async (req, res) => {
  console.log("Signup Data from client to server", req.body);
  try {
    const { name, email, password } = req.body;
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) throw new Error("Something wrong while hashing password");
      else {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          res.status(400).send("Email already registered");
        } else {
          const newUser = await User.create({ name, email, password: hash });
          res.redirect("/");
        }
      }
    });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).send("Signup failed" + err);
  }
});




router.post("/signin", async (req, res) => {
  console.log("Signin Data from client to server", req.body);
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      //convert password to hash and compare
      bcrypt.compare(password, existingUser.password, async (err, result) => {
        if (err)
          throw new Error("Trouble matching input password and stored hash");
        else {
          if (result === true) console.log("User Login Successful!");
          else res.status(400).send("Incorrect Password");
        }
      });
    } else res.status(404).send("User not found");
  } catch (err) {
    console.error("Signin failed", err);
    res.status(500).send("Signin failed" + err);
  }
});

module.exports = router;
