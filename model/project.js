const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	project:[{
		name:String,
		image:String,
		public_id:String,
		title:String,
		description:String,
		link:String,
		youtube:String,
		git:String,
		group:[String],
		technology:[String],
		liked:Number,
		day:{ type: Number , default: new Date().getDate()},
		month:{ type: String , default: new Date().toLocaleString('default', { month: 'long' })},
		year:{ type: Number , default: new Date().getFullYear()}
	}],
})

module.exports = mongoose.model('project', projectSchema);