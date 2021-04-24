const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
	name:String,
	designation:String,
	position:String,
	age:Date,
	city:String,
	country:String,
	description:String,
	services:[{
			image:String,
			title:String,
			description:String,
	}],
	skills:[{
			title:String,
			progress:Number,
	}],
	pricing:[{
			title:String,
			price:Number,
			services:[String]
	}],
})

module.exports = mongoose.model('about', aboutSchema);