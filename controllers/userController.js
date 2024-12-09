const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');
const Group = require('../models/GroupModel');
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
    res.render('register',{message: "Regissstration successfully"})
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

    const userData = await User.findOne({ email }).select("+password");
    if (!userData) {
        res.render('login', {message : "Email and password is incorrect"})
    }
    const isPasswordMatched = await comparePassword(password, userData.password);
    if(isPasswordMatched){
        req.session.user = userData;
        res.cookie(`user`, JSON.stringify(userData));
        res.redirect('/api/v1/dashboard');
    }else{
        res.render('login', {message : "Email and password is incorrect"})
    }

});

const logout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie(`user`);
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

const deletechat = catchAsyncErrors(async (req,res) => {
   
    const deleteChat = await Chat.deleteOne({
        _id: req.body.id });
    res.status(201).json({ success: true, message: "Message Deleted successfully", data: deleteChat });
})

const updatechat = catchAsyncErrors(async (req,res) => {
   
    const updatechat = await Chat.findByIdAndUpdate({
        _id: req.body.id }, {$set: {message: req.body.message}});
    res.status(201).json({ success: true, message: "Message Updated successfully", data: updatechat });
})

const loadGroups = catchAsyncErrors(async (req,res) => {
   const groups = Group.find({ creator_id: req.session.user._id })
    res.render('groups')
})

const createGroup = catchAsyncErrors(async (req,res) => {
    console.log("session data", req.session.user._id);
    const group = new Group({
        creator_id: req.session.user._id,
        name: req.body.name,
        limit: req.body.limit,
        image: 'image/'+req.file.filename
    })

    await group.save();
    res.render('groups', {message : req.body.name+" Group Created successfully"});
 })

module.exports = {
    registerUser,
    loadRegisterUser,
    loginUser,
    loadLoginUser,
    loadDashboard,
    logout,
    saveChat,
    deletechat,
    updatechat,
    loadGroups,
    createGroup
}