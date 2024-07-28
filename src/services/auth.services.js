require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT;
const getToken = (payload) => {
  if (!secretKey) return console.log("Please provide the JWT_SECRET_KEY");
  return jwt.sign(payload, secretKey);
};

const getUserData = (token) => {
  try {
    if (!secretKey) return console.log("Please provide the JWT_SECRET_KEY");
    return jwt.verify(token, secretKey);
  } catch (e) {
    return 1;
  }
};

module.exports = { getToken, getUserData };
