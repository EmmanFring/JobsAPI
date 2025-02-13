const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const usersRouter = express.Router();
const {
  register,
  login,
  logOut,
  user,
} = require("../controllers/usersController");

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.get("/user", auth, user); //retrieve all user
usersRouter.get("/logout", auth, logOut);

module.exports = { usersRouter };
