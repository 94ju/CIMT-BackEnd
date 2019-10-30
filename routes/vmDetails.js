const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcryptjs')
const router = express.Router();
var request = require('request');

// module.exports.absolute = function(number) {
//     return (number>=0)? number: -number
    
//   }

router.get('/compute',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/amazon/services/compute/regions/ap-south-1/products',
     function (error, response, body) {
         res.send(body)
    });  
});
router.get('/eks',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/amazon/services/eks/regions/ap-south-1/products',
     function (error, response, body) {
         res.send(body)
    });  
});
router.get('/pke',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/amazon/services/pke/regions/ap-south-1/products',
     function (error, response, body) {
         res.send(body)
    });  
});
router.get('/gke',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/google/services/gke/regions/asia-east2/products',
     function (error, response, body) {
         res.send(body)
    });  
});
router.get('/gcloud',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/google/services/compute/regions/asia-east2/products',
     function (error, response, body) {
         res.send(body)
    });  
});
router.get('/acloud',(req,res,next)=>{
    request('https://banzaicloud.com/cloudinfo/api/v1/providers/alibaba/services/compute/regions/ap-southeast-2/products',
     function (error, response, body) {
         res.send(body)
    });  
});




 module.exports = router;