const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcrypt')
const router = express.Router();
const jwt =require('jsonwebtoken')
const rp = require('request-promise');
var request = require('request');



router.get('/',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/google/services/compute/regions/asia-east2/products',
     function (error, response, body) {
         res.send(body)
    });  
});


module.exports = router;