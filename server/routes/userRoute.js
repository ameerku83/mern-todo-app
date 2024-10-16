const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const authMiddleware = require('../middleWare/authmiddleware');


const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existuser = await User.findOne({ username});
  if (existuser) return res.status(404).json({ message: 'User already exist make new username' });
  const user = new User({ username, password });
  await user.save();
  res.json({ message: 'User created' });
    } catch (error) {
        console.log(error);
        
    }
  
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true,secure:true,sameSite:"None" }).json({ message: 'Logged in' });
});

router.get('/check',authMiddleware,( req,res, next) => {
   
    const user = req.user;

    if (!user) {
        return res.status(400).json({ success: true, message: "user not authenticated" });
    }
    res.json({ success: true, message: "User authenticated" });

});

router.put('/logout',authMiddleware,( req,res) => {
   
    try {
        res.clearCookie("token",{ httpOnly:true,secure:true,sameSite:"None", });
   

        res.json({ success: true, message: "user logout successfully" });
    } catch (error) {
        console.log(error);
        
    }

});
module.exports = router;
