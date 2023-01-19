const regRouter = require("express").Router();

const regisRouter = require("../contollers/register");

regRouter.post("/signup", regisRouter);

module.exports = regRouter;
