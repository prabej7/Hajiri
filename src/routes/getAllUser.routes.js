const { Router } = require("express");
const checkField = require("../middlewares/checkFields.middleware");
const getAllUserData = require("../utils/getUserAllData.utils");
const getUser = Router();

getUser.post("/", checkField(1), (req, res) => {
  (async () => {
    try {
      const allData = await getAllUserData(req.body.id);
      res.status(200).json(allData);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  })();
});

module.exports = getUser;
