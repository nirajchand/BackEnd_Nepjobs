const JobSeeker = require("../Model/JobSeekerModel");
const User = require("../Model/User");

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
    const { userId, skills, experience, education, contactInfo, desiredIndustry, location, experienceLevel } =
      req.body;

    // If file is uploaded, get the URL
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null; // Multer sets the file path

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the job seeker profile already exists
    const existingProfile = await JobSeeker.findOne({ where: { userId } });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Job seeker profile already exists" });
    }

    // Create new job seeker profile
    const jobSeeker = await JobSeeker.create({
      userId,
      profileImage,  // Add profileImage here
      skills,
      experience,
      education,
      contactInfo,
      desiredIndustry,
      location,
      experienceLevel,
    });

    res.status(201).json({
      message: "Job seeker profile created successfully",
      jobSeeker,
    });
  } catch (error) {
    console.error("Error creating job seeker profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getJobSeekers, createJobSeeker };
