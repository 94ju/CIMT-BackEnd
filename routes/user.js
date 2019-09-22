const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcrypt')
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('check')
});

router.post('/',(req,res,next)=>{
    const user= new User({
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        role:req.body.role
    })
})



module.exports = router;