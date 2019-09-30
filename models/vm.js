const mongoose= require('mongoose')

const vmSchema=mongoose.Schema({
    ami:{type:String},
    instanceType:{type:String},
    numberOfInstances:{type:String},
    storage:{type:String},
    securityGroup:{type:String}
})


module.exports =mongoose.model('Vm',vmSchema)