const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	title:{type:String, required: true},
	url:{type:String, required: true},
	alt:{type:String, required: true},
	place:{type:String},
	group:{type:String, required: true},
	author:{type:String, required: true},
	authorMail:{type:String, required: true},
	authorId:{type:String, required: true},
    description:{type:String, required: true},
	visible: { type: Boolean,default : true },
    approved: { type: Boolean,default : false },
	more:String,
	tags:String,
	storageUrl:String,
	day:{ type: Number , default: new Date().getDate()},
	month:{ type: String , default: new Date().toLocaleString('default', { month: 'long' })},
	year:{ type: Number , default: new Date().getFullYear()},
	likes:[{ mail:String }],
	heart:[{ mail:String }],
	comments: [
		{
			name:String,
			comment:String,
			email:String,
			userId:String,
			visible:{type:Boolean,default:true}
		}
	],
})

module.exports = mongoose.model('image',imageSchema);