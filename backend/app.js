const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const PORT = config.get('port') || 3000;
const { typeText } = require('rewive');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/', require('./product/router'));

app.listen(PORT, () => {
    typeText(10, PORT)
});