const mongoose= require('mongoose')

const usersSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    username:{type:String},
    role:{type:String}
})


module.exports =mongoose.model('User',usersSchema)