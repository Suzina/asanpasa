const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  //console.log("listOfUsers");
  res.json(listOfUsers);
});

router.post("/", async (req, res) => {
  const { username,password,email_address,phone_number,role,access_token } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email_address:email_address,
      phone_number:phone_number,
      role:role,
      access_token:access_token
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => 
{
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) 
  {
    return res.json({ error: "User Doesn't Exist" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) 
  {
    return res.json({ error: "Wrong Username And Password Combination" });
  }
  const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
});

module.exports = router;