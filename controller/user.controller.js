const User = require("../models/user.model");

const getUserForSidebar = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password");

        res.status(200).json(allUsers);
    }
    catch (er) {
        console.log(er.message)
        res.status(400).json({ error: "Server Error" })
    }
}

module.exports = getUserForSidebar;