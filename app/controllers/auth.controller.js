const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.logout = (req, res) => {
  if (req.session.admin && req.cookies.admin_sid) {
    res.clearCookie('admin_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
};

exports.login = (req, res) => {
  res.render('login');
};

exports.loginPOST = (req, res) => {
    var email = req.body.email, password = req.body.password;

    User.findOne({ where: { email: email } }).then(function (user) {
        if (!user) {
            res.redirect('/login');
        }else{
          var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
          );
    
          if (!passwordIsValid) {
            res.redirect('/login');
          }else{
            req.session.admin = user.dataValues;
            res.redirect('/');
          }
        }
    });
};

exports.apiRegister = (req, res) => {
  //Check user availiable
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if(user){
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }else{
      // Save User to Database
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }).then(user => {
            res.send({ message: "User registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
  });
};

exports.apiLogin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 * 30
      });
      
      res.status(200).send({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};