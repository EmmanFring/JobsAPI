const jwt = require("jsonwebtoken");
require("dotenv").config();
const { tokenBlackList } = require("../controllers/usersController");
const auth = (req, res, next) => {
  try {
    // Check if the authorization header exists
    const Authorization = req.headers.authorization;
    if (!Authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    // Extract the token
    const token = Authorization.split(" ")[1];
    if (!token || tokenBlackList.has(token)) {
      return res
        .status(401)
        .json({ message: "Token missing. User not logged in" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Assign the decoded token to the request object
    req.user = decoded;
    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { auth };

// const token = "your_jwt_token_here";

// fetch("https://your-api-endpoint.com/route", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     key: "value", // Your POST request body
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
