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
    search = "money heist mp4 1080"
    var searchTags = search.split(/(?:,| )+/);
    res.end("1");
    await document.getVideos().then(async data => {
        //fs.writeFileSync('data.json',JSON.stringify(data));
        data.forEach(video => {
            var count = 0
            searchTags.forEach(tag => {
                if(video.files.name.includes(tag)){
                    count = count +1;
                }
            });
            video['count'] = count;
        });
        data =data.sort(function(a, b) {
            return b.count - a.count;
        });
        console.log(data);
    });


    /* res.render('getFiles', {
        files: files
      }); */

});

function search(){
    console.log("search it bitch")
}

module.exports = router;
module.exports = search;