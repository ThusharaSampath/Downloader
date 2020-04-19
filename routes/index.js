var express = require('express');
var fs = require('fs');
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
  res.render('home', data);
});

router.post('/', sessionChecker, function (req, res, next) {
  data = customer.userData;
  var url = req.body.url;
  var isVideo = req.body.isVideo
  url = decodeURIComponent(url);
  drive.upload(data.token, {
    url: url,
    email: customer.userData.email,
    isVideo: isVideo
  });
  res.json({
    name: getName(url),
    email: customer.userData.email
  });
});

router.get('/addDrive', sessionChecker, function (req, res, next) {
  data = customer.userData;
  var url = drive.getURL();
  res.render('addDrive', { url: url });
});

router.get('/HowTo', sessionChecker, function (req, res, next) {
  data = customer.userData;
  res.render('HowTo', data);
});

router.post('/addDrive', sessionChecker, function (req, res, next) {
  data = customer.userData;
  var token = req.body.token;
  drive.setToken(token, customer);
  res.end('done');
});


router.get('/getFiles', async function (req, res, next) {
  var files = [];
  res.end("1");
  await document.getFiles().then(async data => {
    for (let i = 0; i < data.length; i++) {
      const file = data[i];
      await drive.getFiles(file.id).then(files_ => {
        files = files.concat(files_);
      });
    }
    document.update(files);

  });

  
  /* res.render('getFiles', {
      files: files
    }); */

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


function getName(url) {

  var url = url.split('?')[0];

  var arr = url.split('/');
  name_ = arr[arr.length - 1];

  arr = name_.split('\\');
  name = arr[arr.length - 1];
  return name
}



module.exports = router;




