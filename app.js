const express = require('express');
const user = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', user);
app.set('view engine', 'ejs');
app.set('views', './views');

module.exports = app;