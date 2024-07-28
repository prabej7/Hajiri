require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const register = require("./routes/register.routes");
const connectToDatabase = require("./config/db");
const createTable = require("./routes/createTable.routes");
const addAttendee = require("./routes/addAttendee.routes");
const getUser = require("./routes/getAllUser.routes");
const login = require("./routes/login.routes");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Database connection
connectToDatabase();

// Routes
app.use("/register", register);
app.use("/create-table", createTable);
app.use("/add-attendee", addAttendee);
app.use("/getuser", getUser);
app.use("/login", login);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
