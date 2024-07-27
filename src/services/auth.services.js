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

// console.log(
//   getUserData(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE0ZTc0ZDZlZDIxMzNkNjVjNTY2NGEiLCJ1c2VybmFtZSI6InByYWJlaiIsImVtYWlsIjoicHJhYmVqQGdtYWlsLmNvbSIsImlhdCI6MTcyMjA4MzE0OX0.-dJ44_1ryOXD5g1dCgutbpUFaYqh1Caw4p2jzTfpRj0"
//   )
// );
