const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskBoardSchema = new Schema({
	title:{type:String, required: true},
	imgSrc:{type:String},
	author:{type:String},
    description:{type:String, required: true},
	visible: { type: Boolean,default : true },
	private:{ type: Boolean,default : false },
	date:{ type : Date, default: new Date()},
	tags:[{type:String}],
	tasks: [{type:Schema.Types.ObjectId,ref:'task'}],
})

module.exports = mongoose.model('taskBoard',taskBoardSchema);