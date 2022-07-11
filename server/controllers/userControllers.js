const User = require('../models/userModel');
const bcrypt = require('bcrypt');  // for encryption of the password

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "Username already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email already used", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "Incorrect Username or Password", status: false });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.json({ message: "Incorrect Password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const avatarImage = req.body.image;
        const data = await User.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage,
        });
        return res.json({ isSet: data.isAvatarImageSet, image: data.avatarImage });
    }
    catch (err) {
        next(err);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (err) {
        next(err);
    }
};