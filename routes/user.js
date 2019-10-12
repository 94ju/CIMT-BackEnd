const express = require("express");
const User =require("../models/users");
const bcrypt= require('bcryptjs')
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
    User.findOne({email:req.body.email})
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
            console.log(result)
            if(!result){
                return res.status.json({
                    message:"Authentication failed"
                })
            }
            const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
                'secret_webtoken_encryption',
                {expiresIn:'1h'});
            console.log(token)
            res.status(200).json({
                token:token,
                expiresIn:3600
            })
        })
        .catch(err=>{
            return res.status(404).json({
                message:"Authentication failed"
            })
        })
})



module.exports = router;