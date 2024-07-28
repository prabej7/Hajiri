import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "table",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", userSchema);
