const JWT = require("jsonwebtoken");

const verifyCookies = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    JWT.verify(token, process.env.JSON_TOKEN_SECRET, (error, decoded) => {
      if (error)
        return res.status(401).json({ message: "User authentication failed" });
      req.id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
};

module.exports = verifyCookies;
