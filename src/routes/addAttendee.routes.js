import express from "express";

import { checkFields } from "../middlewares/checkFields.middleware.js";
import { Attendee } from "../models/attendee.model.js";
import { Table } from "../models/table.model.js";

const router = express.Router();

router.post("/", checkFields(2), (req, res) => {
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

export default router;
