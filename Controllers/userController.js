const validator = require("validator");
const userModel = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const userId = user._id;
        const token = createToken(user._id);

        // Send the plain password (not recommended for production)
        res.json({ success: true, token, userId, password: password, user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error occurred" });
    }
};


// Register user
// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Weak password (minimum 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);

        // Send the plain password (not recommended for production)
        res.json({ success: true, token, userId: user._id, password: password, user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error occurred" });
    }
};

module.exports = { loginUser, registerUser };
