// helper.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    return await bcrypt.hash(password, salt);
};

exports.getJWTToken = function (userId) {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};
