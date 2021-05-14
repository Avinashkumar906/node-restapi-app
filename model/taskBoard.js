const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskBoardSchema = new Schema({
	title:{type:String, required: true},
	imgSrc:{type:String},
	author:{type:String},
	description:{ type:String, required: true },
	visible: { type: Boolean,default : true },
	private:{ type: Boolean,default : false },
	created:{ type : Date, default: new Date()},
	updated:{ type : Date},
	tags:[{type:String}],
	body:{type:String, required: true},
	profile:{type:Schema.Types.ObjectId, ref:'profile'},
	// tasks: [{type:Schema.Types.ObjectId,ref:'task'}],
})

module.exports = mongoose.model('taskBoard',taskBoardSchema);