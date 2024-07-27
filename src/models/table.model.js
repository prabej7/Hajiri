const { Schema, model } = require("mongoose");

const tableSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "attendee",
    },
  ],
});

const Table = model("table", tableSchema);

module.exports = Table;
