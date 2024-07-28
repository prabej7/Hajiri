import checkUser from "../utils/checkUser.utils.js";
import { User } from "../models/user.model.js";
import { getToken } from "../services/auth.services.js";
import { hashSync } from "bcrypt";
import { ErrorHandler } from "../middlewares/error.js";
import { getUserAllData } from "../utils/getUserAllData.utils.js";
import bcrypt from "bcrypt";
const register = async (req, res, next) => {
  // add avatar remaining
  try {
    const { username, email, password } = req.body;
    if (!(await checkUser(req.email))) {
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashSync(password, 12),
      });

      getToken(res, newUser, 201, "User Created");
    } else {
      return res.status(400).json({
        error: "User with the same email or username already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 404));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password!",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid email or password!",
      });
    }
    getToken(res, user, 201, `Welcome back,${user.username}`);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 404));
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Find the user by username
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "User with this username does not exist!",
      });
    }

    // Verify the old password
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Old password is incorrect!",
      });
    }

    // Hash and update the new password
    user.password = bcrypt.hashSync(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset!" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const getAllUserData = async (req, res, next) => {
  try {
    const allData = await getUserAllData(req.body.id);
    res.status(200).json({ success: true, data: allData });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
// Logout Functionality
const logout = (req, res) => {
  return res
    .status(200)
    .cookie("attandee-token", "", { ...cookieOption, maxAge: 0 })
    .json({
      success: true,
      message: "logout successfully",
    });
};
const reset = async (req, res, next) => {};
export { register, login, forgetPassword, getAllUserData, reset, logout };
