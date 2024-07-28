import { User } from "../models/user.model.js";

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

export default checkUser;
