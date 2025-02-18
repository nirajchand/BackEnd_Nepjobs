import AppliedJob from "./../Model/AppliedJob.js";
import Job from "./../Model/Job.js";

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
};




