const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcryptjs')
const router = express.Router();
var request = require('request');



router.get('/',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/amazon/services/compute/regions/ap-south-1/products',
     function (error, response, body) {
         res.send(body)
    });  
});


module.exports = router;