const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
	education:[{
		title:String,
		college:String,
		date:String,
		description:String,
	}],
	experience:[{
		title:String,
		college:String,
		date:String,
		description:String,
	}],
	testimonial:[{
		clientName:String,
		position:String,
		company:String,
		saying:String,
	}],
})

module.exports = mongoose.model('resume', resumeSchema);