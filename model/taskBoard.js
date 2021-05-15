const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskBoardSchema = new Schema({
	imgSrc:{type:String},
	author:{type:String},
	title:{type:String, required: true},
	description:{ type:String, required: true },
	visible: { type: Boolean,default : true },
	private:{ type: Boolean,default : false },
	created:{ type : Date, default: new Date()},
	updated:{ type : Date},
	tags:[{type:String}],
	body:{type:String, default: '<h3>Write here!</h3>'},
	theme:{type:String},
	show:{ type: Boolean, default : true },
	profile:{type:Schema.Types.ObjectId, ref:'profile'},
	// tasks: [{type:Schema.Types.ObjectId,ref:'task'}],
})

module.exports = mongoose.model('taskBoard',taskBoardSchema);