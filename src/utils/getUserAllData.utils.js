const { getUserData } = require("../services/auth.services");
const User = require("../models/user.model");

const getUserAllData = (id) => {
  return new Promise(async (resolve, reject) => {
    const user_id = getUserData(id)._id;
    const user = await User.findById(user_id).populate({
      path: "tables",
      populate: {
        path: "attendees",
        model: "attendee",
      },
    });

    resolve(user);
  });
};

module.exports = getUserAllData;
