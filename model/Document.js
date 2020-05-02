const db = require('./db');
const Drive = require('./Drive');
const fs = require('fs');
const Axios = require('axios');

var drive = new Drive();


class Document {
    constructor() {
        this.loggedIn = false;
    }

    getFiles = async function () {

        var dataOut;
        await db.getCollection('customer').then((data) => {
            dataOut = data;
        });
        return dataOut;
    }

    getDB = async function () {
        await drive.downloadFile('pchamikagangul@gmail.com',"1XaBZpjIFFb1vCB0K7-s-jZpAKflyJCDR");
    }

    getVideos = async function () {
        var data = fs.readFileSync('data.txt', 'utf8')
        data = JSON.parse(data);
        return data;
    }

    /* update = async function (data) {
        var i=0;
        await data.forEach(async file => {
            i=i+1;
            console.log(i,file.name);
            await db.update('videos',file.name,file);
        });
    } */

    updateDB = async function () {
        var files = [];
        (new Document()).getDB();
        await (new Document()).getFiles().then(async data => {
            for (let i = 0; i < data.length; i++) {
                const file = data[i];
                await drive.getFiles(file.id).then(files_ => {
                    files = files.concat(files_);
                });
            }
            (new Document).getVideos().then(result => {

                var temp = []
                files.forEach(file => {
                    if (!temp.includes(file.name)) {
                        temp.push(file.name);
                        if (typeof result[file.id] == 'undefined') {
                            result[file.id] = {}
                        }
                        result[file.id] = Object.assign(result[file.id], file);
                        if(typeof result[file.id].view == 'undefined'){
                            result[file.id]['view'] = 0
                        }
                        if(typeof result[file.id].down == 'undefined'){
                            result[file.id]['down'] = 0
                        }
                    }
                });
                console.log(Object.keys(result).length);
                drive.saveDB('pchamikagangul@gmail.com', result);
                for (let i = 0; i < result.length; i++) {
                    const film = result[i];
                    Axios({
                        method: "GET",
                        url: film.thumbnail,
                        responseType: 'stream'
                    });
                }
            });


        });

    }

    updateDB_details = async function (detail,id) {
        console.log(detail);
        (new Document).getVideos().then(result => {
            if(typeof result[id][detail] == 'undefined'){
                result[id][detail] = 1
            }else{
                result[id][detail]= result[id][detail]  + 1
            }
            console.log(result[id]);
            drive.saveDB('pchamikagangul@gmail.com', result);
        });

    }



    /* readDocument = async function (id) {
        var dataOut;
        await db.get('document', id).then((data) => {
            dataOut = data.document;
        });
        return dataOut
    }
    readDocumentDetails = async function (ids) {
        var dataOut;
        //rs
        //console.log(ids);
        await db.getAll('documentDetails', ids).then((data) => {
            dataOut = data;
        });

        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            await drive.getAFile(id).then((res) => {
                dataOut[id]['url'] = res[0].webViewLink;
            });;
        }
        return dataOut
    } */
}



module.exports = Document;
