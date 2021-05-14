const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:'visitor'},
    bio:{type:String,default:'default bio!'},
    image:String,
    cover:String,
    mob:String,
    designation:String,
    position:String,
    age:Date,
    city:String,
    country:{type:String,default:'India'},
    description:String,
    resettoken:String,
    expiry:{type:String,default:(Date.now() + 24*3600)},
    blocked:{type:Boolean,default:false},
    verified:{type:Boolean,default:false},
    images:[{type:Schema.Types.ObjectId,ref:'image'}],
    taskBoards:[{type:Schema.Types.ObjectId,ref:'taskBoard'}],
    about:{type:Schema.Types.ObjectId,ref:'about'},
    resume:{type:Schema.Types.ObjectId,ref:'resume'},
    project:{type:Schema.Types.ObjectId,ref:'project'},
    contact:{type:Schema.Types.ObjectId,ref:'contact'}
})

module.exports = mongoose.model('profile', profileSchema)