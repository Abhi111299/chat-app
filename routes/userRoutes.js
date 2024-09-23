const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController')
const multer = require('../utils/multerConfig')


router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);

module.exports = router;