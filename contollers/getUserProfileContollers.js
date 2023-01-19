const User = require("../models/userSchema");

async function getUser(req, res) {
  try {
    const user = await User.findById(req.id);
    if (!user)
      return res.status(403).json({ message: "Resoure Access forbidden" });

    // return the profile of verified user
    const { _id, email, password, createdAt, updatedAt, __v, ...other } =
      user._doc;

    return res.status(200).json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getUser;
