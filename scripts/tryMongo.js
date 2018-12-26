'use strict';

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'play';

// const client = new MongoClient(url, { useNewUrlParser: true });
//
// client.connect((err) => {
//     if(err !== null){
//         console.log('db is gone', err);
//         return;
//     }
//
//     const db = client.db(dbName);
//     db.collection('playx').find().toArray((err, docs) => {
//         console.log(`Result of find: ${JSON.stringify(docs)}`);
//         client.close();
//     });
// });

// MongoClient.connect('mongodb://localhost/play', (err, db) => {
//     db.collection('playx').find().toArray((err, docs) => {
//         console.log(`Result of find: ${docs}`);
//         db.close();
//     });
// });

// function usage() {
//     console.log('Usage:');
//     console.log('node', __filename, '<option>');
//     console.log('Where option is one of:');
//     console.log(' callbacks Use the callbacks paradigm');
//     console.log(' promises Use the Promises paradigm');
//     console.log(' generator Use the Generator paradigm');
//     console.log(' async Use the async module');
// }
// if (process.argv.length < 3) {
//     console.log("Incorrect number of arguments");
//     usage();
// } else {
//     if (process.argv[2] === 'callbacks') {
//         testWithCallbacks();
//     } else if (process.argv[2] === 'promises') {
//         testWithPromises();
//     }  else {
//         console.log("Invalid option:", process.argv[2]);
//         usage();
//     }
// }

const testCollectionName = "employees";
const client = new MongoClient(url, { useNewUrlParser: true });

function testWithCallbacks(){
    client.connect((err) => {
        if(err !== null){
            console.log('db is gone', err);
            return;
        }
        const db = client.db(dbName);
        db.collection(testCollectionName).insertOne({id:1, name: "A. Callback"}, (err, result) => {
            console.log(`Result of insert: ${result.insertedId}`);
            db.collection(testCollectionName).find({id: 1}).toArray((err, docs) => {
                console.log(`Result of find: ${JSON.stringify(docs)}`);
                db.close();
            });
        });
    });
}

function testWithPromises() {
    let db;
    client.connect().then(() => {
        db = client.db(dbName);
        return db.collection(testCollectionName).insertOne({id:1, name: "A. Callback"});
    }).then(result => {
        console.log(`Result of insert: ${result.insertedId}`);
        return db.collection(testCollectionName).find().toArray();
    }).then((docs) => {
        console.log(`Result of find: ${JSON.stringify(docs)}`);
        return client.close();
    }).catch(err => {
        console.log('ERROR', err);
    });
}

testWithPromises();