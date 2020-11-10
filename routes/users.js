const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User } = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already registered.");
  
    user = new User(_.pick(req.body, ["username", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  
    await user.save();
  
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send(_.pick(user, ["_id", "username", "password"]));
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Credentials wrong");
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Credentials wrong");
  
    const token = user.generateAuthToken();
    res.status(200).send({ token });
});

module.exports = router;

