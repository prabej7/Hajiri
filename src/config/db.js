import mongoose from "mongoose";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/Attendances";
const connectToDatabase = () => {
  if (!DB_URL) {
    throw new Error("Please provide the database url.");
  }
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export default connectToDatabase;
