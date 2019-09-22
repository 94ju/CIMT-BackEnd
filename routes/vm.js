const express = require("express");
const checkAuth =require('../middleware/check-auth')

router.get('/vmdata',checkAuth,(req,res,next)=>{
    res.send('check')
});