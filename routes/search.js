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
  var customer = new Customer();
  if (typeof req.session.db == 'undefined') {
    console.log(req.session.db);
    req.session.db = true;
  }

  if (!(req.session.user && req.cookies.user_sid)) {
    next();
  } else {
    customer.logBySession(req.session.userName).then(() => {
      next();
    });
  }
};
router.post('/', async function (req, res, next) {
  
  Search = req.body.tags;
  Search = Search.toLowerCase();
  Page = req.body.page;
  var searchTags = Search.split(/(?:,| )+/);
  await document.getVideos().then(async data => {
    //fs.writeFileSync('data.json',JSON.stringify(data));
    var result = []
    Object.keys(data).forEach(id => {
      var video = data[id];

      var count = 0
      searchTags.forEach(tag => {
        if (video.name.includes(tag)) {
          count = count + 1;
        }
      });
      video['count'] = count;

      result.push(video);

    });
    result.sort(function (a, b) {
      return a.name.localeCompare(b.name);;
    });

    result.sort(function (a, b) {
      return (b.view+b.down*3) - (a.view+a.down*3);
    });

    result.sort(function (a, b) {
      return b.count - a.count;
    });




    result = result.filter(d => d.count > 0);
    console.log(result.length);


    R = {
      cards : result.slice(20*Page,20*(Page+1)),
      CPage : parseInt(Page),
      Pages : Math.round(result.length/20)
    }

    res.end(JSON.stringify(R));
  });


  /* res.render('getFiles', {
      files: files
    }); */

});

/* GET search page. */
router.get('/', sessionChecker, function (req, res, next) {
  //document.getDB();
  data = customer.userData;
  res.render('search', data);
});


router.get('/db', async function (req, res, next) {
  res.end("db");
  document.updateDB();
});

router.get('/views', async function (req, res, next) {
  res.end("views");
  document.updateDB_views('1aRFoK83rKDMA__cFbdMLlmYqIV4uZF3g');
});
module.exports = router;