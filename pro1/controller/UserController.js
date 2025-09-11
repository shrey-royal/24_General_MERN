const userModel = require('../model/UserModel');

// Add a new user
const addUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = await userModel.create({ name, email, age });

        res.status(201).json({
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        console.error("Add User Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            message: "Users List",
            data: users
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        res.status(200).json({
            message: "User fetched!",
            data: user
        });
    } catch (error) {
        console.error("Get User by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "User updated!",
            data: updatedUser
        });
    } catch (error) {
        console.error("Update User by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update user by email
const updateUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const userData = req.body;

        const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "User updated!",
            data: updatedUser
        });
    } catch (error) {
        console.error("Update User by Email Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "User deleted!",
            data: deletedUser
        });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserByEmail,
    deleteUser
};
