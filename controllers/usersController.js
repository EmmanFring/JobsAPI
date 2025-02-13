const { Users } = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config;
// use bcrypt to hash your password
// authentication = session and jwt
// cookies unique idntifier for visitors to a site, stored on the browser

// register
tokenBlackList = new Set();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: `${email} already exists` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await Users.create({ email, password: hashedPassword });
    const user = await Users.findOne({
      where: { email },
    });
    if (user) {
      // uniquely identifies the user
      const payload = {
        addedBy: user.id,
      };
      // Generate a JWT token using the jwt.sign function, signing it with a secret key from process.env.JWT_SECRET_KEY.
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "120m",
      });
      console.log(token);
      return res
        .status(200)
        .json({ message: "Logged in successfully", user: newUser, token });
    }
    // Respond with new user details

    // res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Await the result of Users.findOne()
    const user = await Users.findOne({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare passwords
    const valid = await bcrypt.compare(password, user.password);

    // Generate token if password is valid
    if (valid) {
      // uniquely identifies the user
      const payload = {
        addedBy: user.id,
      };
      // Generate a JWT token using the jwt.sign function, signing it with a secret key from process.env.JWT_SECRET_KEY.
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "120m",
      });
      // console.log(token)
      return res
        .status(200)
        .json({ message: "Logged in successfully", token, user });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

async function user(req, res) {
  const { addedBy } = req.user;
  try {
    const user = await Users.findOne({
      where: { id: addedBy },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const logOut = async (req, res) => {
  try {
    const Authorization = req.headers.authorization;
    if (!Authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract the token
    const token = Authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token missing. User not logged in" });
    }
    // token is in the Authorization
    // If using cookies, clear the cookie
    tokenBlackList.add(token);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { register, login, logOut, tokenBlackList, user };
