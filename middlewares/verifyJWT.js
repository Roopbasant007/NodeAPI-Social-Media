const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];

    // let token = authHeader && authHeader.split(" ")[1];
    let token = authHeader;

    if (!token)
      return res.status(401).json({ message: "Requires Access Token" });
    jwt.verify(token, process.env.JSON_TOKEN_SECRET, (error, decoded) => {
      if (error)
        return res.status(401).json({ message: "User authentication failed" });
      req.id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = verifyJWT;
