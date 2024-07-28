import mongoose, { Schema, Types, model } from "mongoose";

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

export const Table = mongoose.models.Table || model("Table", tableSchema);
