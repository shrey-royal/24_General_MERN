const userModel = require('../model/UserModel');
const encrypt = require('../util/encrypt');
const token = require('../util/token');
const cloudinaryController = require('../controller/CloudinaryController');
const multer = require("multer")

// Add a new user
const addUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;

        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        // encrypt password before adding into DB
        const hashedPassword = encrypt.encryptPassword(password);
        const newUser = await userModel.create({ name, email, age, hashedPassword });

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

// Get user by Age
const getUserByAge = async (req, res) => {
    try {
        const age = parseInt(req.params.age, 0);

        if (isNaN(age)) {
            return res.status(400).json({ message: "Invalid age parameter" });
        }

        const users = await userModel.find({ age: { $gte : age } });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the specified age" });
        }

        res.status(200).json({
            message: "User fetched by age!",
            data: users
        });
    } catch (error) {
        console.error("Get User by Age Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user by Age Range
const getUserByAgeRange = async (req, res) => {
    try {
        const minAge = parseInt(req.query.minAge);
        const maxAge = parseInt(req.query.maxAge);

        if (isNaN(minAge) || isNaN(maxAge)) {
            return res.status(400).json({ message: "Invalid age range parameters" });
        }

        const users = await userModel.find({
            age: { $gte : minAge, $lte : maxAge }
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found within the specified age range" });
        }

        res.status(200).json({
            message: "User fetched by age range!",
            data: users
        });
    } catch (error) {
        console.error("Get User by Age Range Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const hashedPassword = encrypt.encryptPassword(req.body.password);
        const userData = Object.assign(req.body, {
            password: hashedPassword
        });
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
        const hashedPassword = encrypt.encryptPassword(req.body.password);
        const userData = Object.assign(req.body, {
            password: hashedPassword
        });
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

// Login User
const loginUser = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await userModel.findOne({ email: email });

        if (userData) {
            const isPasswordMatched = encrypt.comparePassword(password, userData.password);

            if (isPasswordMatched == true) {
                const tk = token.generateToken(userData.toObject())
                res.status(200).json({
                    message: "Login success!",
                    data: tk
                });
            } else {
                res.status(400).json({
                    message: "Invalid Password"
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid Credentials"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype == "image/jpeg" || file.mimetype == 'image/png' || file.mimetype == "image/jpg") {
            callback(null, true);
        } else {
            return callback(new Error("only .jpeg, .png, .jpg formats are allowed!"))
        }
    }
}).single("file");

// uploadFile
const uploadFile = async(req, res) => {
    try {
        upload(req, res, async(err) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
            } else {
                if (req.file) {
                    const result = await cloudinaryController.uploadFile(req.file);

                    res.status(200).json({
                        message: "File uploaded successfully",
                        data: req.file,
                        cloudinaryData: result
                    });
                } else {
                    res.status(400).json({
                        message: "file not found",
                    });
                }
            }
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByAge,
    getUserByAgeRange,
    updateUserById,
    updateUserByEmail,
    deleteUser,
    loginUser,
    uploadFile
};
