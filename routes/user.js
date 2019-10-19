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
                            message:"Email Exists"
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
                    message:"Invalid email"
                })
            }
            fetchedUser=user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result=>{
            console.log(result)
            if(!result){
                return res.status.json({
                    message:"Invalid password"
                })
            }
            const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
                process.env.JWT_KEY,
                {expiresIn:'1h'});
            console.log(token)
            res.status(200).json({
                token:token,
                expiresIn:3600,
                userId:fetchedUser._id,
                userName:fetchedUser.username
            })
        })
        .catch(err=>{
            return res.status(404).json({
                message:"Invalid credentials"
            })
        })
})



module.exports = router;