import express from "express"
import upload from "../middleware/upload.middleware.js"
import { sendEmailController } from "../controller/email.controller.js"

const router = express.Router();

router.post("/send",upload.single("resume"),sendEmailController)


export default router;