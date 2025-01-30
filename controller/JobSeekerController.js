const JobSeeker = require("../Model/JobSeeker");

const getJobSeekers = async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.findAll();
        res.status(200).json(jobSeekers);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve job seekers" });
    }
};

const createJobSeeker = async (req, res) => {
    try {
        const { userID, resume, skills, experience } = req.body;
        const newJobSeeker = await JobSeeker.create({ userID, resume, skills, experience });
        res.status(200).json(newJobSeeker);
    } catch (error) {
        res.status(500).json({ error: "Failed to create job seeker" });
    }
};

module.exports = { getJobSeekers, createJobSeeker };
