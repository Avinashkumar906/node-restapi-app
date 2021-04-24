const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	address:{
			line1:String,
			line2:String,
	},
	contact:{
			mob:Number,
			email:String,
	},
	web:{
			url:String,
			url2:String,
	},
	social:{
			facebook:String,
			insta:String,
			twitter:String,
			linkedink:String,
	}
})

module.exports = mongoose.model('contact', contactSchema);