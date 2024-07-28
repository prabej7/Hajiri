const User = require("../models/user.model");

const checkUser = (value) => {
  return new Promise(async (resolve, reject) => {
    const isUser = await User.findOne({
      $or: [{ username: value }, { email: value }],
    });
    if (isUser) {
      return resolve(true);
    }
    return resolve(false);
  });
};

module.exports = checkUser;
