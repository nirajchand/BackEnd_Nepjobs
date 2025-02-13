import express from 'express';
const router = express.Router();
import upload from '../middleware/imageUpload.js';

import { createJob, getJobs, getJobById} from '../controller/JobController.js';

router.post("/postJob",upload.single("jobLogo"),createJob)
router.get("/getJobs", getJobs)
router.get("/getJob/:job_id",getJobById)

export default router;