const express = require("express");
const checkAuth =require('../middleware/check-auth');
const Vm = require('../models/vm');
const router = express.Router();
var AWS = require('aws-sdk');

function getconfig(){
  console.log("check vm")
  AWS.config.update({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:process.env.region
  })
}

router.get('/vmdata',(req,res,next)=>{
    Vm.find().then(
      vms=>{
        // res.send(vms)
        res.status(200).json({
          message: "vms fetched successfully!",
          vms: vms
        })
      }
    )  
});
router.delete('/vmdata',(req,res,next)=>{
  
  Vm.deleteOne({ _id: req.query.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "vm deleted!" });
  });
  const instanceID=req.query.InstanceId
  console.log(req.query.id)
  AWS.config.update({
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:process.env.region
  })

// create an ec2 object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// setup params
const params = {
  InstanceIds: [
    instanceID    
  ]
};
ec2.r
ec2.terminateInstances(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});
})
router.post('/createvm',checkAuth,(req,res)=>{
    console.log(req.userData)
    
    getconfig();
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var instanceParams = {
        ImageId: req.body.ami, 
        InstanceType: req.body.instanceType,
        KeyName: req.body.keyname,
        MinCount: 1,
        MaxCount: 1
     };

     var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();
     instancePromise.then(
        function(data) {
          console.log(data);
          var instanceId = data.Instances[0].InstanceId;
          console.log("Created instance", instanceId);
          // Add tags to the instance
          const vm = new Vm({
            InstanceId:instanceId,
            PrivateIpAddress:data.Instances[0].PrivateIpAddress,
            ami:req.body.ami,
            instanceType:req.body.instanceType,
            keyname:req.body.keyname,
            tag:req.body.tag,
            securityGroup:req.body.securityGroup,
            creator:req.userData.userId
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
        tagParams = {Resources: [instanceId], Tags: [
             {
                Key: 'Name',
                Value: req.body.tag
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

router.post('/reboot',(req,res)=>{
    const instanceID=req.body.InstanceId
    console.log("reboot"+instanceID);
    AWS.config.update({
      accessKeyId:process.env.accessKeyId,
      secretAccessKey:process.env.secretAccessKey,
      region:process.env.region
    })
    const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    // setup instance params
    const params = {
      InstanceIds: [
        instanceID    
      ]
    };
    ec2.startInstances(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data);           // successful response
      }  
    });
})
router.post('/stop',(req,res)=>{
    const instanceID=req.body.InstanceId
    console.log("reboot"+instanceID);
    AWS.config.update({
      accessKeyId:process.env.accessKeyId,
      secretAccessKey:process.env.secretAccessKey,
      region:process.env.region
    })
    const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    // setup instance params
    const params = {
      InstanceIds: [
        instanceID    
      ]
    };
    ec2.stopInstances(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data);           // successful response
      }  
    });
})
router.post('/start',(req,res)=>{
    const instanceID=req.body.InstanceId
    console.log("reboot"+instanceID);
    getconfig();
    const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    // setup instance params
    const params = {
      InstanceIds: [
        instanceID    
      ]
    };
    ec2.startInstances(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data);           // successful response
      }  
    });
})
module.exports = router;