const express = require('express');
const app = express();
const users =require('./models/users');
const mongoose=require('mongoose');
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://janith:u3dvQPRtFHQHaWXc@cluster0-pwla0.mongodb.net/userDetails?retryWrites=true&w=majority").
    then(
            ()=>console.log('connected to database')
        ).catch(
            ()=>console.log("connection failed")
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  
  app.use("/api/users", userRoutes);
  module.exports =app
// app.get('/api',(req,res,next)=>{
//     res.send('check');
// });
// app.post('/api/user',(req,res)=>{
//     const user = new user({
//         email:req.body.email,
//         password:req.body.password
//     });
//     user.save();
// })



app.listen(3000,()=>console.log('lister port 3000'))