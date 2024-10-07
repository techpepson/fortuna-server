//route definition for the email controller
import express from "express";
import { sendClientConsultation } from "../controllers/email.controller.js";
import { ContactController } from "../controllers/contact.controller.js";
const router = express.Router();

router.post("/fortuna/send-email", sendClientConsultation);
router.post("/fortuna/contact", ContactController);

export default router;
