var express = require('express');
var fs = require('fs');

var Customer = require('../model/Customer');
var Drive = require('../model/Drive');

var Document = require('../model/Document');
var document = new Document();

var router = express.Router();
var customer = new Customer();


var drive = new Drive();

var sessionChecker = (req, res, next) => {
  customer = new Customer();
  if (!(req.session.user && req.cookies.user_sid)) {
    //not logged in
    next();
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
  document.getDB();
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
router.get('/test', sessionChecker, function (req, res, next) {
  data = customer.userData;
  res.render('test', data);
});
router.get('/subtitles', sessionChecker, function (req, res, next) {
  data = customer.userData;
  res.render('subtitles', data);
});
router.get('/film', sessionChecker, function (req, res, next) {
  data = customer.userData;
  res.render('films', data);
});
router.get('/settings', sessionChecker, function (req, res, next) {
  data = customer.userData;
  res.render('settings', data);
});


router.post('/addDrive', sessionChecker, function (req, res, next) {
  data = customer.userData;
  var token = req.body.token;
  drive.setToken(token, customer);
  res.end('done');
});


router.get('/getFiles', async function (req, res, next) {



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
    res.redirect('/');
  } else {
    res.redirect('/');
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


function getName(url, isVideo=false, header='') {
  var url = url.split('?')[0];

  var arr = url.split('/');
  name_ = arr[arr.length - 1];

  arr = name_.split('\\');
  name = arr[arr.length - 1];

  if (isVideo == 'true') {
      name = name + '.mp4'
  }
  HEADER = []
  try {
      HEADER = header.split(';');
  } catch{ }

  HEADER.forEach(element => {

      try {
          e = element.trim().split('=');
          if (e[0] == 'filename') {
              name = e[1]
          }
      } catch{ }

  });



  console.log('inside getName', isVideo, " : ", name);
  return name
}



module.exports = router;




