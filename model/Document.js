const db = require('./db');


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

    getVideos = async function () {

        var dataOut;
        await db.getCollection('videos').then((data) => {
            dataOut = data;
        });
        return dataOut;
    }

    update = async function (data) {
        var i=0;
        await data.forEach(async file => {
            i=i+1;
            console.log(i,file.name);
            await db.update('videos',file.name,file);
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
