const express = require('express');
const passport = require('passport');
const {
  register,
  login,
  googleAuth,
  getProfile,
  updateProfile,
  changePassword,
  refreshToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  validate,
} = require('../middleware/validation');

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/refresh-token', refreshToken);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/error' }),
  googleAuth
);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidation, validate, updateProfile);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);

module.exports = router;
