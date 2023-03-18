const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "Bad Request, either Email or Password field is Empty.",
      });

    const checkUser = await User.findOne({ email: email });
    // check if user exists
    if (!checkUser)
      return res.status(400).json({ message: "User doesn't exist" });

    // check if password is correct
    const ispwdCorrect = await bcrypt.compare(password, checkUser.password);

    if (!ispwdCorrect)
      return res.status(404).json({ message: "Invalid Email or  Password" });

    const payload = {
      id: checkUser.id,
    };
    const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET); // Token will be valid for a day long

    // return the created data with token
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
    });
    return res.status(200).json({
      id: checkUser.id,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal server error" });
  }
}

module.exports = loginUser;
