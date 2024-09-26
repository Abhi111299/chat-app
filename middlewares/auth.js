const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const session = require('express-session');

const isLogout = catchAsyncErrors(async(req,res, next) => {
    if(req.session.user){
        res.redirect('/api/v1/dashboard');
    }else {
        next(); // Allow the request to proceed if the user is not logged in
    }
})

const isLogin = catchAsyncErrors(async (req, res, next) => {
    if (req.session.user) { console.log(req.session.user,"#######");
        next(); // Allow the request to proceed if the user is logged in
    } else { console.log("*****");
        res.redirect('/api/v1'); // Redirect to login if the user is not logged in
    }
});

module.exports = {
    isLogin,
    isLogout
}