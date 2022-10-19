const express = require('express');
const router = express.Router();
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const SignupController = require('../controllers/signup');
const signupController = new SignupController();

// 회원가입 API
router.post('/', authLoginUserMiddleware, signupController.postSignup);

module.exports = router;
