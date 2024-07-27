const { Router } = require("express");
const checkFields = require("../middlewares/checkFields.middleware");
const { getUserData } = require("../services/auth.services");
const Table = require("../models/table.model");
const User = require("../models/user.model");

const createTable = Router();

createTable.post("/", checkFields(2), (req, res) => {
  (async () => {
    try {
      const { id, tableName } = req.body;
      const userId = getUserData(id)._id;
      const newTable = new Table({
        name: tableName,
      });

      const savedTable = await newTable.save();
      const user = await User.findById(userId);
      user.tables.push(savedTable);
      await user.save();

      res.status(200).json({ msg: "Table created successfully!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal server error!" });
    }
  })();
});

module.exports = createTable;
