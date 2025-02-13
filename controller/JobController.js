import { where } from "sequelize";
import Job from "../Model/Job.js";

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve jobs" });
  }
};

const createJob = async (req, res) => {
  try {
    // console.log('Request Body:', req.body); // Log the body
    // console.log('Uploaded File:', req.file); // Log the file data

    const {
      employer_id,
      title,
      description,
      skillsRequired,
      salary,
      applicationDeadline,
    } = req.body;

    const jobLogo = req.file ? `/uploads/${req.file.filename}` : null;

    const newJob = await Job.create({
      employer_id,
      title,
      jobLogo,
      description,
      skillsRequired,
      salary,
      applicationDeadline,
    });
    res.status(200).json({ message: "Job Saved successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { job_id } = req.params;

    const job = await Job.findOne({ where: { job_id: Number(job_id) } });

    if (!job) {
      return res.status(400).json({ message: "Job not found fuck" });
    } 

    const fullImageUrl = job.jobLogo
      ? `http://localhost:5000${job.jobLogo}`
      : null;

    res
      .status(200)
      .json({ ...job.dataValues, jobLogo: fullImageUrl });
  } catch {}
};

export { getJobs, createJob,getJobById };
