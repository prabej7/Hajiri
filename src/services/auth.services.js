import jwt from "jsonwebtoken";
const secretKey = process.env.JWT || "ksjafuafasfkamfadsfgrrhrhre";
const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const getToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, secretKey);

  return res.status(code).cookie("attandee-token", token, cookieOption).json({
    success: true,
    message,
  });
};

const getUserData = (token) => {
  try {
    if (!secretKey) return console.log("Please provide the JWT_SECRET_KEY");
    return jwt.verify(token, secretKey);
  } catch (e) {
    return 1;
  }
};

export { getToken, getUserData };

// console.log(
//   getUserData(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE0ZTc0ZDZlZDIxMzNkNjVjNTY2NGEiLCJ1c2VybmFtZSI6InByYWJlaiIsImVtYWlsIjoicHJhYmVqQGdtYWlsLmNvbSIsImlhdCI6MTcyMjA4MzE0OX0.-dJ44_1ryOXD5g1dCgutbpUFaYqh1Caw4p2jzTfpRj0"
//   )
// );
