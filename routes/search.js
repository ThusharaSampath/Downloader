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
router.post('/', async function (req, res, next) {
    search = req.body.tags;
    var searchTags = search.split(/(?:,| )+/);
    await document.getVideos().then(async data => {
        //fs.writeFileSync('data.json',JSON.stringify(data));
        data.forEach(video => {
            var count = 0
            searchTags.forEach(tag => {
                if (video.name.includes(tag)) {
                    count = count + 1;
                }
            });
            video['count'] = count;
        });
        data.sort(function (a, b) {
            return b.count - a.count;
        });

        data = data.filter(d =>  d.count > 0 );
        console.log(data.length);

        res.end(JSON.stringify(data));
    });


    /* res.render('getFiles', {
        files: files
      }); */

});

/* GET search page. */
router.get('/',sessionChecker, function (req, res, next) {
    document.getDB();
    data = customer.userData;
    res.render('search', data);
  });


router.get('/db', async function (req, res, next) {
    res.end("1");
    document.updateDB();
});
module.exports = router;