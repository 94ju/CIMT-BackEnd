const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcrypt')
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('check')
});

router.post('/',(req,res,next)=>{
    bcrypt.hash(req.body.password,10).
        then(hash=>{
            const user= new User({
                email:req.body.email,
                password:hash,
                username:req.body.username,
                role:req.body.role
            });
            user.save().
                then(result=>{
                    res.status(201).json({
                        message:'user created',
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
   
})



module.exports = router;