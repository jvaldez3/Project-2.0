var express = require('express');
var mysql = require('mysql')

var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
})); //For body parser
app.use(bodyParser.json());

var passport = require("./config/passport");

var db = require("./models");

app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Welcome to Passport with Sequelize and without HandleBars');
});

db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(process.env.PORT || 8080, (res) => {
    console.log('Listening on port 8080')
  });
});