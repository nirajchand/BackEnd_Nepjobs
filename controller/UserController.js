const User = require("../Model/User");
const JobSeeker = require("../Model/JobSeekerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const createUser = async (req, res) => {
  try {
    const { fname, lname, gender, email, number, password, usertype } =
      req.body;

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      fname,
      lname,
      gender,
      email,
      number,
      password: hashedPassword, // Save hashed password
      usertype,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        where: { email: email },
      });
  
      // Check if the user exists
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { userId: user.id, role: user.usertype },
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1d" } // Token expiry
      );
  
      let requiresProfileCompletion = false;
  
      if (user.usertype === "Job seeker") {
        console.log("Checking job seeker for userId:", user.id);
        const jobSeeker = await JobSeeker.findOne({ where: { userId: user.id } });
        console.log( jobSeeker)
  
        // If JobSeeker profile is not found, set requiresProfileCompletion to true
        if (jobSeeker) {
          requiresProfileCompletion = false;
        }else{
            requiresProfileCompletion = true
        }
      }
  
      // Send the response only after checking the JobSeeker profile
      res.json({
        message: "Login successful",
        userId: user.id,
        token,
        requiresProfileCompletion,
      });
    } catch (error) {
      console.error(error);
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

module.exports = { getUsers, createUser, loginUser };
