import AppliedJob from "./../Model/AppliedJob.js";
import Job from "./../Model/Job.js";
import User from './../Model/User.js';
import JobSeeker from './../Model/JobSeekerModel.js';

export const appliedJob = async (req, res) => {
  const { user_id, job_id } = req.body; // Get data from request body

  try {
    await AppliedJob.create({ user_id, job_id });
    res.status(201).json({ message: "Job applied successfully!" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};

export const getAppliedJobs = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(user_id)) {
    return res.status(400).json({ message: "Invalid user_id" });
  }

  try {
    const appliedJobs = await AppliedJob.findAll({
      where: { user_id }, 
      attributes: ["applicationid", "applicationStatus"],
      include: {
        model: Job,
        attributes: ["title", "salary", "applicationDeadline"],
      },
    });

    if (!appliedJobs.length) {
      return res.status(404).json({ message: "No applied jobs found" });
    }
    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Error fetching applied jobs" });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const {applicationid} = req.params;

    const deleted = await AppliedJob.destroy({ where: { applicationid } });

    if (deleted) {
      return res.json({ message: "Job application deleted successfully." });
    } else {
      return res.status(404).json({ error: "Job application not found." });
    }
  } catch (error) {
    console.error("Error deleting applied job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getAppliedJobsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await AppliedJob.findAll({
      where: { job_id: jobId },
      include: [
        {
          model: User,
          attributes: ["id", "fname","lname","gender"], 
          include: [
            {
              model: JobSeeker,
              attributes: ["profileImage", "skills", "location", "experienceLevel"], 
            },
          ],
        },
      ],
    });

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this job." });
    }
    res.status(200).json({ message: "Applications retrieved successfully.", applications });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const updateApplicationStatus = async (req, res) => {
  const { applicationid } = req.params;
  const { applicationStatus } = req.body;

  // Validate input
  if (!applicationid || isNaN(applicationid)) {
    return res.status(400).json({ message: "Invalid application ID" });
  }
  if (!applicationStatus) {
    return res.status(400).json({ message: "Application status is required" });
  }

  try {
    const application = await AppliedJob.findByPk(applicationid);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the status
    await application.update({ applicationStatus });

    res.status(200).json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Error updating application status" });
  }
};



