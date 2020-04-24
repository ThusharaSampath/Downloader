var admin = require("firebase-admin");


var serviceAccount = require("../config/config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://downloaderbackup.firebaseio.com"
    databaseURL: "https://downloader-fba29.firebaseio.com"
});

const db = admin.firestore();

const save = function (collection, document, data) {
    return db.collection(collection).doc(document).set(data).then(() => {
        console.log("Data saved");
    });
}

const get = async function (collection, document) {
    var data;
    await db.collection(collection).doc(document).get().then(doc => {
        if (!doc.exists) {
            console.log("no doc exists");
            process.exit();
        }
        data = doc.data();
    });
    return data;

}

const getAll = async function (collection, documents) {
    var data = {};

    let itemRefs = documents.map(id => {
        return db.collection(collection).doc(id).get();
    });
    await Promise.all(itemRefs).then(docs => {
        docs.forEach((doc, k) => {
            data[documents[k]] = doc.data();
        });
    }).catch(error => console.log(error));

    return data;

}

const find = async function (collection, key, val) {
    var data = [];
    await db.collection(collection).where(key, "==", val).get().then(snap => {
        snap.forEach(doc => {
            data[data.length] = doc.data();
        });
        //console.log(data)
    })
    return data;
}

const push = async function (col, data) {
    var id;
    await db.collection(col).add(data).then(ref => {
        id = ref.id;
    });
    return id;
}



const update = async function (col, doc, data) {
    await db.collection(col).doc(doc).set(data, { merge: true });
}



const saveFile = async function (table, colun, file) {
    // code to save a file
}

const getCollection = async function (collection) {
    var data;
    await db.collection(collection).get().then(snap => {
        data = snap.docs.map(doc => {
            return { id: doc.id, files: doc.data() }
        });
    });
    return data;

}


const getToken = async function (email) {
    var token;
    await find('customer', 'email', email).then(function (value) {

        if (value.length) {
            try{
                token = value[0].token;
            }catch{
                token ={}
            }
        }
    });
    return token
}

module.exports.save = save;
module.exports.get = get;
module.exports.getAll = getAll;
module.exports.find = find;
module.exports.push = push;
module.exports.update = update;
module.exports.saveFile = saveFile;
module.exports.getToken = getToken;
module.exports.getCollection = getCollection;











/*
        *Examples


getQuote().then(result =>{
    console.log(result);
    const obj = JSON.parse(result);
    const quateData = {
        quate : obj.quate,
        author : obj.author
    };
    return db.collection('sampleData').doc('inspiration4').set(quateData).then(()=>{
        console.log("Data saved");
    });
});


function getQuote(){
    return new Promise((resolve, reject)=>{
        resolve(`{
            "quate" : "fly and fly",
            "author" : "gangul"
        }`);
    });
}

db.collection('sampleData').doc('inspiration4').get().then(doc=>{
    if(!doc.exists){
        console.log("no doc exists");
        process.exit();
    }
    console.log(doc.data());
});

*/