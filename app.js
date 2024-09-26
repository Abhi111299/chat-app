const express = require('express');
const user = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.use(bodyParser.json()); // to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'fhiufw89nfdcas',  // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set true for HTTPS
}));

app.use('/api/v1', user);
app.set('view engine', 'ejs');
app.set('views', './views');

module.exports = app;