const express = require("express");
const usersRouter = express.Router();
const { register, login, logOut } = require("../controllers/usersController");

usersRouter.post("/register", register);
usersRouter.post("/login", login);


usersRouter.get("/logout", logOut);

module.exports = { usersRouter };
