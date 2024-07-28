import { User } from "../models/user.model.js";

const getUserAllData = (id) => {
  return new Promise(async (resolve, reject) => {
    const user_id = getUserAllData(id)._id;
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

export { getUserAllData };
