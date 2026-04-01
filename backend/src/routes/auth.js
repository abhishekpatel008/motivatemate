const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, updateUser} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);
router.put('/update', protect, updateUser);

module.exports = router;