const express = require('express');
const router = express.Router();
const { loadLoginUser, saveChat, updatechat, deletechat, logout, loadDashboard, loadRegisterUser, loginUser, registerUser } = require('../controllers/userController')
const upload = require('../utils/multerConfig');
const { isLogout, isLogin } = require('../middlewares/auth');


router.route("/register").post(isLogout, upload.single('image'),  registerUser);
router.route("/register").get(loadRegisterUser);
router.route("/").get(isLogout, loadLoginUser);
router.route("/").post(loginUser); 
router.route('/dashboard').get(isLogin, loadDashboard);
router.route('/logout').get(logout);
router.route('/logout').post(logout);
router.route('/savechat').post(saveChat);
router.route('/deletechat').post(deletechat);
router.route('/updatechat').post(updatechat);
router.route('*').get(loadLoginUser);
// router.route("/login").post(loginUser);

module.exports = router;