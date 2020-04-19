var express = require('express');
var fs = require('fs');
var Document = require('../model/Document');
var Customer = require('../model/Customer');
var Drive = require('../model/Drive');


var router = express.Router();

var customer = new Customer();
var document = new Document();
var drive = new Drive();

router.get('/', async function (req, res, next) {
    var searchtag = 'bad';
    res.end("1");
    await document.getVideos().then(async data => {
        //fs.writeFileSync('data.json',JSON.stringify(data));
        data.forEach(video => {
            if (video.files.name.includes(searchtag)) {
                console.log(video.name);
            }
        });
    });


    /* res.render('getFiles', {
        files: files
      }); */

});

module.exports = router;