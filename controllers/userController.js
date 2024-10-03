const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');
// const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const session = require('express-session');
const { comparePassword } = require('../utils/helper');

const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        image: 'images/'+req.file.filename
    });
    res.render('register',{message: "Registration successfully"})
    // sendToken(user, 201, res);
});

const loadRegisterUser = catchAsyncErrors(async (req, res, next) => {
   res.render('register');
});

const loadLoginUser = catchAsyncErrors(async (req, res, next) => {
    res.render('login');
 });

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 401));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        res.render('login', {message : "Email and password is incorrect"})
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if(isPasswordMatched){
        req.session.user = user;
        res.redirect('/api/v1/dashboard');
    }else{
        res.render('login', {message : "Email and password is incorrect"})
    }

});

const logout = catchAsyncErrors(async (req, res, next) => {
    req.session.destroy();
    res.redirect('/api/v1/');
});

const loadDashboard = catchAsyncErrors(async (req, res, next) => {
    var users = await User.find({ _id : { $nin : [req.session.user._id]}})
    res.render('dashboard', {user: req.session.user, users:users});
});

const saveChat = catchAsyncErrors(async (req,res) => {
    const { sender_id, receiver_id, message } = req.body;
    const chat = await Chat.create({
        sender_id, receiver_id, message
    });
    res.status(201).json({ success: true, message: "Message sent successfully", data: chat });
})

module.exports = {
    registerUser,
    loadRegisterUser,
    loginUser,
    loadLoginUser,
    loadDashboard,
    logout,
    saveChat
}