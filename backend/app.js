const express = require('express');
const cors = require('cors');
const app = express();
const config = require('config');
const PORT = config.get('port') || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/', require('./product/router'));

app.listen(PORT, () => console.log(`Back-end has been started! http://localhost:${PORT}`));
