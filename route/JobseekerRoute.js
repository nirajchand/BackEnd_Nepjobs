import express from 'express'
import upload from '../middleware/imageUpload.js';
const router = express.Router();

import { createJobSeeker,getJobSeekerByUserId } from '../controller/JobSeekerController.js';

router.post("/CreateProfile", upload.single("profileImage"),createJobSeeker);
router.get("/getProfile/:userId",getJobSeekerByUserId)


export default router;