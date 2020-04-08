var express = require('express');
var Document = require('../model/Document');
var Customer = require('../model/Customer');
var Drive = require('../model/Drive');

var router = express.Router();

var customer = new Customer();
var document = new Document();
var drive = new Drive();

var sessionChecker = (req, res, next) => {
  if (!(req.session.user && req.cookies.user_sid)) {
    res.redirect('/login');
  } else {
    customer.logBySession(req.session.userName).then(() => {
      next();
    });

  }
};

var sessionCheckerForLog = (req, res, next) => {
  if ((req.session.user && req.cookies.user_sid)) {
    res.redirect('/');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', sessionChecker, function (req, res, next) {
  data = customer.userData;

  //drive.getAFile("rtCcxficW3mcvuJkf9Wj");

  res.render('home', data);
});




router.post('/details', function (req, res, next) {
  data = customer.userData;

  reqData = {};
  res.setHeader('Content-Type', 'application/json');
  console.log(typeof(data.documents) != 'undefined');
  if (typeof(data.documents) != 'undefined'){
    document.readDocumentDetails(Object.keys(data.documents)).then(data => {
      console.log(data);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, null, 3));
    });
  }
});







router.get('/login', sessionCheckerForLog, function (req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', sessionCheckerForLog, function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  customer.login(email, password).then((data) => {
    console.log(data);
    if (data.logged) {
      req.session.user = data.session;
      req.session.userName = data.userName;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ logged: true }, null, 3));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ logged: false }, null, 3));
    }
  });

});

router.get('/signUp', sessionCheckerForLog, function (req, res, next) {
  res.render('signUp', { title: 'SignUp' });
});

router.post('/signUp', sessionCheckerForLog, function (req, res, next) {
  data = req.body;
  console.log(data);
  customer.signUp(data).then(saved => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ saved: saved }, null, 3));
  })
    .catch(error => {
      console.log(error);
      res.redirect('/signUp');
    });
});

router.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/login');
  } else {
    res.redirect('/login');
  }
});

router.post('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});


module.exports = router;




