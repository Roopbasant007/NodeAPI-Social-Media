const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];

    // let token = authHeader && authHeader.split(" ")[1];
    let token = authHeader;

    if (!token)
      return res.status(401).json({ message: "Requires Access Token" });
    const JSON_TOKEN_SECRET = 01b1daf323a9471188a1a4ef298ab750ffacc912b08ff7841955ed10f199dc8f0d705877bdab8bd89ec52577a77a6c136a7c9aae1747930e53ecb3764cb854dc;
    jwt.verify(token, JSON_TOKEN_SECRET, (error, decoded) => {
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
