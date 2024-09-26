// helper.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    return await bcrypt.hash(password, salt);
};

exports.getJWTToken = function (userId) {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};

exports.comparePassword = async function (inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
};
