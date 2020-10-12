const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title:{type:String},
    html:{type:String, required: true},
	visible: { type: Boolean,default : true },
	private:{ type: Boolean,default : false },
	date:{ type : Date, default: new Date()},
	tags:[{type:String}],
	taskBoard:{type:Schema.Types.ObjectId,ref:'taskBoard'},
})

module.exports = mongoose.model('task',taskSchema);