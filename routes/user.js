const express = require("express");
const User =require("../models/users");

const router = express.Router();




router.get('/',(req,res,next)=>{
    res.send('check')
})

module.exports = router;