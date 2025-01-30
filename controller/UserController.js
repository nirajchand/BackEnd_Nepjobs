const {User} = require('../Model/User')
console.log('User model:', User); 
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, usertype } = req.body;

        // Validation: Ensure all required fields are present
        if (!name || !email || !password || !usertype) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create user
        
        const newUser = await User.create({ name, email, password, usertype });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

module.exports = { getUsers, createUser };
