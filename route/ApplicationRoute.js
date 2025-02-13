import express from 'express';
const router = express.Router();
import {appliedJob,getAppliedJobs} from './../controller/ApplicationController.js';

router.post("/appliedJobs",appliedJob)
router.get("/getAppliedJobs/:user_id",getAppliedJobs)

export default router;