const express = require("express");
const checkAuth =require('../middleware/check-auth');
const Vm = require('../models/vm');
const router = express.Router();
var AWS = require('aws-sdk');


router.get('/vmdata',checkAuth,(req,res,next)=>{
    res.send('check')
});
router.post('/createvm',checkAuth,(req,res)=>{
  
    const vm = new Vm({
        ami:req.body.ami,
        instanceType:req.body.instanceType,
        numberOfInstances:req.body.numberOfInstances,
        storage:req.body.storage,
        securityGroup:req.body.securityGroup
    })
    vm.save().
    then(result=>{
        res.status(201).json({
            message:'vm saved to db',
            result:result
        })
    }).
    catch(err=>{
        res.status(500).json(
            {
                error:err
            }
        )
    })
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var instanceParams = {
        ImageId: vm.ami, 
        InstanceType: vm.instanceType,
        KeyName: 'checkapijanith',
        MinCount: 1,
        MaxCount: vm.numberOfInstances
     };

     var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();
     instancePromise.then(
        function(data) {
          console.log(data);
          var instanceId = data.Instances[0].InstanceId;
          console.log("Created instance", instanceId);
          // Add tags to the instance
          tagParams = {Resources: [instanceId], Tags: [
             {
                Key: 'Name',
                Value: 'SDK Sample'
             }
          ]};
          var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
          tagPromise.then(
            function(data) {
              console.log("Instance tagged");
            }).catch(
              function(err) {
              console.error(err, err.stack);
            });
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
})

router.post('/vmstatus',(req,res)=>{

var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};

ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    console.log("Success", JSON.stringify(data));
  }
});
})
module.exports = router;