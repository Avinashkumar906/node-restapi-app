const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title:{type:String,required: true},
	description:{type:String, required: true},
	startDate:{type:String,default: new Date().toLocaleDateString()},
	endDate:{type:String, default: new Date().toLocaleDateString()},
	startTime:{type:String,default: new Date().toLocaleTimeString()},
	endTime:{type:String, default: new Date().toLocaleTimeString()},
	visible: { type: Boolean,default : true },
	private:{ type: Boolean,default : false },
	created:{ type : Date, default: new Date()},
	theme:String,
	group:String,
	priority:String,
	severity:String,
	tags:[{type:String}],
	profile:{type:Schema.Types.ObjectId, ref:'profile'},
	imgSrc:{type:String},
	author:{type:String},
	progress:String
	// taskBoard:{type:Schema.Types.ObjectId,ref:'taskBoard'},
})

module.exports = mongoose.model('task',taskSchema);