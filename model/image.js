const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    album:Boolean,
    image:Boolean,
	alt:{type:String, required: true},
	url:{type:String, required: true},
	place:{type:String, required: true},
	title:{type:String, required: true},
    description:{type:String, required: true},
    author:{type:String, required: true},
	likes:{ type: Number, default : 0 },
	heart:{ type: Number, default : 0 },
	visible: { type: Boolean,default : true },
    approved: { type: Boolean,default : true },
	day:{ type: Number , default: new Date().getDate()},
	month:{ type: String , default: new Date().toLocaleString('default', { month: 'long' })},
	year:{ type: Number , default: new Date().getFullYear()},
	more:String,
    tags:[String],
    urls:[
		{
			url:String,
			alt:String,
		}
	],
	comments: [
		{
			name:String,
			comment:String,
		}
	],
})

module.exports = mongoose.model('image',imageSchema);