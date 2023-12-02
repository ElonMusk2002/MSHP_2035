const mongoose = require('mongoose');
const config = require('config');
const url = config.get('mongoUri');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;