const mongoose= require('mongoose')

const vmSchema=mongoose.Schema({
    InstanceId:{type:String},
    ami:{type:String},
    instanceType:{type:String},
    keyname:{type:String},
    tag:{type:String},
    securityGroup:{type:String},
    PrivateIpAddress:{type:String},
    creator:{type: mongoose.Schema.Types.ObjectId,ref:"User"}
    // LaunchTime:{type:Date}
})


module.exports =mongoose.model('Vm',vmSchema)