const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:'visitor'},
    bio:{type:String,default:'default bio!'},
    image:String,
    mob:String,
    cover:String,
    blocked:{type:Boolean,default:false},
    verified:{type:Boolean,default:false},
    resettoken:String,
    expiry:{type:String,default:(Date.now() + 24*3600)},
    images:[{type:Schema.Types.ObjectId,ref:'image'}]
})

module.exports = mongoose.model('profile', profileSchema)