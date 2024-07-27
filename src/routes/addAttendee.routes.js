const { Router } = require("express");
const checkFields = require("../middlewares/checkFields.middleware");
const Attendee = require("../models/attendee.model");
const Table = require("../models/table.model");

const addAttendee = Router();

addAttendee.post("/", checkFields(2), (req, res) => {
  (async () => {
    try {
      const { tableid, attendeeName } = req.body;
      const newAttendee = new Attendee({
        name: attendeeName,
        table: tableid,
      });

      const savedAttendee = await newAttendee.save();

      const table = await Table.findById(tableid);
      table.attendees.push(savedAttendee);
      await table.save();

      return res
        .status(201)
        .json({ msg: "Attendee added to the table successfully!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal server error!" });
    }
  })();
});

module.exports = addAttendee;
