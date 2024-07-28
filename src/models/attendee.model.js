import mongoose, { Schema, Types, model } from "mongoose";

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  presence: {
    type: Boolean,
    default: false,
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: "table",
    required: true,
  },
});

export const Attendee =
  mongoose.models.Attendee || model("Attendee", attendeeSchema);
