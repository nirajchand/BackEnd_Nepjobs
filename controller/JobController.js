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
      return res.status(400).json({ message: "Job not found" });
    } 

    const fullImageUrl = job.jobLogo
      ? `http://localhost:5000${job.jobLogo}`
      : null;

    res
      .status(200)
      .json({ ...job.dataValues, jobLogo: fullImageUrl });
  } catch {}
};


const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getJobsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;

    const jobs = await Job.findAll({
      where: { employer_id: employerId },
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.jobLogo = `/uploads/${req.file.filename}`;
    }


    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    await job.update(updatedData);
    res.status(200).json({ message: "Job updated successfully.", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



export { getJobs, createJob,getJobById,getJobsByEmployer,deleteJob,updateJob};
