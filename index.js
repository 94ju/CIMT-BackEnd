const express = require('express');
const app = express();
const users =require('./models/users');
const mongoose=require('mongoose');
const userRoutes = require("./routes/user");
const vmRoutes = require("./routes/vm");
const vmdetails= require("./routes/vmDetails")
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://janith:8ioKbD9PFwPyNypx@cluster0-pwla0.mongodb.net/CIMT?retryWrites=true&w=majority").
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
  app.use("/api/vms", vmRoutes);
  app.use("/api/vmdetails", vmdetails);
  module.exports =app
