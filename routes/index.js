import emailRoute from "./email.routes.js";
import express from "express";

const router = express.Router(); // Define a router, not app

router.use("/email", emailRoute); // Use the router to handle /email routes

export default router;
