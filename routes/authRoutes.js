const router = require("express").Router();

const loginUser = require("../contollers/authControllers");

// User Authentication
router.post("/authenticate", loginUser);

module.exports = router;
