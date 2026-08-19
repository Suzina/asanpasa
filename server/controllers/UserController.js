const { Users } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const getAll = asyncHandler(async (req, res) => 
{
  const users = await Users.findAll({
      order: [['createdAt', 'DESC']]
  });
  if (!users) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }
  res.json(users);
 
});

const getOne = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const user = await Users.findByPk(id);
  if (!user) 
  {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  res.json(user);
 
});
const create = asyncHandler(async (req, res)=> 
{
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

const update = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const { username,email_address,phone_number,role,password } = req.body;

  if (!username || !username.trim()) 
  {
    const err = new Error("username is required");
    err.status = 400;
    throw err;
  }
  const user = await Users.findByPk(id);

  if (!user) 
  {
    const err = new Error("user not found");
    err.status = 400;
    throw err;
  }

  if (username !== undefined) user.username = username;
  if (email_address !== undefined) user.email_address = email_address;
  if (phone_number !== undefined) user.phone_number = phone_number;
  if (role !== undefined) user.role = role;

  await user.save();

  res.json(user); // return the updated object
  
});

const remove = asyncHandler(async (req, res) => 
{
  const id = req.params.id;
  const user = await Users.findByPk(id);
  if (!user) 
  {
    const err = new Error("user not found");
    err.status = 400;
    throw err;
  }

  await user.destroy();
  res.json({ message: "user deleted successfully" });
} 
);
const login = asyncHandler(async (req, res) => 
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
      "importantsecret",
      //{ expiresIn: "5h" }
    );
    res.json(accessToken);
} 
);

module.exports = { getAll, getOne, create, update, remove,login };