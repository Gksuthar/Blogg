const validator = require("validator");
const userModel = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare plain text passwords
        if (password !== user.password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Weak password (minimum 8 characters)" });
        }

        // Save user with plain text password
        const newUser = new userModel({ name, email, password });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

module.exports = { loginUser, registerUser };
