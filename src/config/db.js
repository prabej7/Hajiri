const { connect } = require("mongoose");
const DB_URL = process.env.DB_URL;
const connectToDatabase = () => {
  if (!DB_URL) {
    throw new Error("Please provide the database url.");
  }
  connect(DB_URL)
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((e) => {
      throw new Error(e);
    });
};

module.exports = connectToDatabase;
