const express = require('express');
const userModel = require('../models/user-model');
const router = express.Router();

const { registerUser ,loginUser, logoutUser} = require('../controllers/authController');

require('dotenv').config();


router.get('/', (req, res) => {
    res.send('Users Router')
})

router.post('/register', registerUser )
router.post('/login', loginUser )
router.get('/logout', logoutUser)

module.exports = router;