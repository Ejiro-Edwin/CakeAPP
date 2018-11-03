const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Route file
const cakes = require('./routes/api/cake');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World Boss!'));

app.use('/api/cake', cakes);

// serve statis assets if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder build
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
