const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser', protect, getUser);
router.patch('/updateuser', protect, updateUser);

module.exports = router;
