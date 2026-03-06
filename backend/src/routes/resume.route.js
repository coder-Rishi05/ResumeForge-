import express from "express";
import { resumeAnalyse } from "../controller/resume.controller.js";
import upload from "../middleware/upload.middleware.js";

const resumeRouter = express.Router();

resumeRouter.post("/analyse", upload.single("resume"), resumeAnalyse);

export default resumeRouter;
