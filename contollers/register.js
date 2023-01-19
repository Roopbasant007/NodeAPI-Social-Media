const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

async function regisUser(req, res) {
  try {
    const { userName, email, password } = req.body;

    const newUser = new User({
      userName: userName,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    await newUser.save();

    return res.status(201).json({ message: "User Registeration Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
}

module.exports = regisUser;
