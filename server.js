const express = require("express");
const cors = require("cors");
const twig = require('twig');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();

app.use(express.static('public'));

app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

app.use(cookieParser());

app.use(session({
  key: 'admin_sid',
  secret: 'njKvrjgFLv0ROWBB2e5CjCFPH5EPqmUm',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('admin_sid');        
  }
  next();
});

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

require('./app/routes/dashboard.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/gardener.routes')(app);

// set port, listen for requests
const PORT = 1873;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});