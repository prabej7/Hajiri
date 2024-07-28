import express from "express";

import { checkFields } from "../middlewares/checkFields.middleware.js";

const router = express.Router();

router.post("/", checkFields(2));

export default router;
