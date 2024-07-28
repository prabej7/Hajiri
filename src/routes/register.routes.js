const { Router } = require("express");
const checkUser = require("../utils/checkUser.utils");
const checkFields = require("../middlewares/checkFields.middleware");
const User = require("../models/user.model");
const { hashSync } = require("bcrypt");
const { getToken } = require("../services/auth.services");
const register = Router();

register.post("/", checkFields(3), (req, res) => {
  const { username, email, password } = req.body;
  (async () => {
    try {
      if (!(await checkUser(req.email))) {
        const newUser = new User({
          username: username,
          email: email,
          password: hashSync(password, 12),
        });
        const savedUser = await newUser.save();
        const token = getToken({
          _id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });
        res.status(200).json({ msg: "User account created successfully!" });
      } else {
        return res.status(201).json({
          error: "User with the same email or username already exists!",
        });
      }
    } catch (e) {
      return res.status(500).json({ error: "Internal server error!" });
    }
  })();
});

module.exports = register;
