import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import createTable from "./routes/createTable.routes.js";
import addAttendee from "./routes/addAttendee.routes.js";
import userRoutes from "./routes/user.route.js";
import { ErrorHandler } from "./middlewares/error.js";

const app = express();

dotenv.config({
  path: "./.env",
});
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Database connection
connectToDatabase();

// Routes
app.use("/user", userRoutes);
app.use("/create-table", createTable);
app.use("/add-attendee", addAttendee);

// Error Handling Middleware
app.use(ErrorHandler);
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
