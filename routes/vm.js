const express = require("express");
const checkAuth =require('../middleware/check-auth');
const Vm = require('../models/vm');
const router = express.Router();

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
})





module.exports = router;