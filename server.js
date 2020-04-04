const express = require('express');
// morgan hooks into our routes and console.logs our requests and responses;
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

const app = express();

// logger / morgan will throw errors for me on logging requests
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect my routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// connect to mongoose to mongo.db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
	useNewUrlParser: true
});
app.listen(PORT, () => {
	console.log(`App running on port localhost://${PORT}`);
});