const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const CakeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	yumFactor: [
		{
			value: {
				type: Number
			}
		}
	],
	comments: [
		{
			text: {
				type: String
			}
		}
	]
});

module.exports = Cake = mongoose.model('cake', CakeSchema);
