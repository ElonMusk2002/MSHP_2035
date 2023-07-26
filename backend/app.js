const express = require('express');
const cors = require('cors');
const app = express();

// Use environment variable for the port
const PORT = process.env.PORT || 3000;

const { typeText } = require('rewive');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/products', require('./product/router'));

app.listen(PORT, () => {
    typeText(10, PORT);
});
