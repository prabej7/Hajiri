const User = require("../models/user.model");

const checkUser = (email) => {
  return new Promise(async (resolve, reject) => {
    const isUser = await User.findOne({
      email: email,
    });
    if (isUser) {
      return resolve(true);
    }
    return resolve(false);
  });
};

module.exports = checkUser;
