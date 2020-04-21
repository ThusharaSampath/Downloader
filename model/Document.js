const db = require('./db');
const Drive = require('./Drive');
const fs = require('fs');

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
        await drive.getDB('pchamikagangul@gmail.com');

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
        await (new Document()).getFiles().then(async data => {
            for (let i = 0; i < data.length; i++) {
                const file = data[i];
                await drive.getFiles(file.id).then(files_ => {
                    files = files.concat(files_);
                });
            }
            var result = (new Document).getVideos();
            var temp = []
            files.forEach(file => {
                if (!temp.includes(file.name)) {
                    temp.push(file.name);
                    if (typeof result[file.id] == 'undefined') {
                        result[file.id] = {}
                    }
                    result[file.id] = Object.assign(result[file.id], file);
                }
            });
            console.log(Object.keys(result).length);
            drive.saveDB('pchamikagangul@gmail.com', result);
        });

    }

    updateDB_views = async function (id) {

        var result = (new Document).getVideos();
        
        if(typeof result[id] == 'undefined'){
            result.id[]
        }
        console.log(Object.keys(result).length);
        drive.saveDB('pchamikagangul@gmail.com', result);


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
