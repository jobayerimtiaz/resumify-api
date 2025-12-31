import express from "express";

import {
  enhanceJobDescription,
  uploadResume,
} from "../controllers/aiController.js";
import { enhanceSummary } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/summary", protect, enhanceSummary);
aiRouter.post("/job-description", protect, enhanceJobDescription);
aiRouter.post("/upload", protect, uploadResume);

export default aiRouter;
