const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcrypt')
const router = express.Router();
const jwt =require('jsonwebtoken')

router.get('/',(req,res,next)=>{
    res.send('check')
});
router.post('/register',(req,res,next)=>{
    console.log(req.body)
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
   
});

router.post('/login',(req,res,next)=>{
    let fetchedUser;
    User.findOne({email:req.bode.email})
        .then(user=>{
            if(!user){
                return res.status.json({
                    message:"Authentication failed"
                })
            }
            fetchedUser=user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result=>{
            if(!result){
                return res.status.json({
                    message:"Authentication failed"
                })
            }

        })
        .catch(err=>{
            return res.status.json({
                message:"Authentication failed"
            })
        })
})



module.exports = router;