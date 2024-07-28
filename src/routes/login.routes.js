const { Router } = require("express");
const checkFields = require("../middlewares/checkFields.middleware");
const checkUser = require("../utils/checkUser.utils");
const { compareSync } = require("bcrypt");
const User = require("../models/user.model");
const { getToken } = require("../services/auth.services");
const login = Router();

login.post("/", checkFields(2), (req, res) => {
  (async () => {
    try {
      const { username, password } = req.body;
      if (await checkUser(username)) {
        const user = await User.findOne({
          $or: [{ username: username }, { email: username }],
        });
        const isPasswordCorrect = compareSync(password, user.password);
        if (isPasswordCorrect) {
          const token = getToken({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
          });
          return res.status(200).json({ msg: "User loged in successfully!" });
        }

        return res
          .status(401)
          .json({ erro: "Username or password is incorrect !" });
      }
      return res.status(404).json({ msg: "User doesn't exists!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = login;
