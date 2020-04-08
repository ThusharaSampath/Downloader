const db = require('./db');
var Drive = require('../model/Drive');

var drive = new Drive();

class Document {
    constructor() {
        this.loggedIn = false;
    }
    saveToken(token, customer) {
        //console.log(data);

        db.update('customer', customer.userData.email, {
            token: token
        });



        //save a ref in coustomer db
    }


    
    readDocument = async function (id) {
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
    }
}

module.exports = Document;
