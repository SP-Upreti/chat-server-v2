const User = require("../models/user.model");
const becrypt = require('bcryptjs');
const generateTokenSetCookie = require("../utils/generateToken");


const Register = async (req, res) => {
    const { name, email, gender, phone, password, confirmPassword } = req.body;
    try {
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Password and Confirm Password does not match" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ success: false, message: "User with this email already exists" });
        }

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${name}`;

        const salt = await becrypt.genSalt(10);
        const hashedPassword = await becrypt.hash(password, salt);

        const newUser = new User(
            {
                name: name,
                email: email,
                password: hashedPassword,
                gender: gender,
                contact: phone,
                profilePic: gender == "male" ? boyPic : girlPic
            }
        )
        generateTokenSetCookie(newUser._id, res);
        await newUser.save();
        res.status(200).json({ success: true, message: "User Registered Sucessfully" });
    }
    catch (err) {
        console.log("Registration Error ", err.message)
        res.status(500).json({ success: false, message: "Server Error guys" + err.message })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const passwordMatch = await becrypt.compare(password, user?.password || "");

        if (!user || !passwordMatch) {
            return res.json({ success: false, message: "Invalid user detail" });
        }
        generateTokenSetCookie(user._id, res);
        res.status(200).json({ success: true, _user: user });
    }
    catch (err) {
        console.log("Login Error ", err.message)
        res.status(500).json({ success: false, message: "Server Error guys" + err.message })
    }
}

const Logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ success: true, message: "Logout sucessfully" })
    }
    catch (err) {
        console.log("Logout Error ", err.message)
        res.status(500).json({ success: false, message: "Server Error guys" + err.message })
    }
}

module.exports = { Login, Register, Logout };