// creating jwt token and saving that into cookies
const { getJWTToken } = require('../utils/helper')

const sendToken = (user,statusCode, res) => {
    const token = getJWTToken(user._id);

    //options fpr cookies
    const options = {
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE *24 *60 *60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, options).json({success: true, token, user });
};

module.exports = sendToken;