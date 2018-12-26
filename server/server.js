const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Issue = require('./issue.js');


const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
    res.send('Hello!');
    // console.log(req.query, req.header, req.path, req.url, req.body);
});


const url = 'mongodb://localhost:27017';
const dbName = 'issueTracker';
const collectionName = "issues";
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect().catch(err => console.log(err));

// function testWithPromises() {
//     let db;
//     client.connect().then(() => {
//         db = client.db(dbName);
//         return db.collection(collectionName).insertOne({id:1, name: "A. Callback"});
//     }).then(result => {
//         console.log(`Result of insert: ${result.insertedId}`);
//         return db.collection(collectionName).find({id: 1}).toArray();
//     }).then((docs) => {
//         console.log(`Result of find: ${JSON.stringify(docs)}`);
//         return client.close();
//     }).catch(err => {
//         console.log('ERROR', err);
//     });
// }

// if (process.env.NODE_ENV !== 'production') {
//     const webpack = require('webpack');
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');
//     const config = require('../webpack.config');
//     config.entry.app.push('webpack-hot-middleware/client',
//         'webpack/hot/only-dev-server');
//     config.plugins.push(new webpack.HotModuleReplacementPlugin());
//     const bundler = webpack(config);
//     app.use(webpackDevMiddleware(bundler, { noInfo: true }));
//     app.use(webpackHotMiddleware(bundler, { log: console.log }));
// }

app.get('/api/v1/issues', (req, res) => {
    let db = client.db(dbName);
    db.collection(collectionName).find().toArray().then(issues => {
        // console.log(issues);
        const metadata = {total_count: issues.length};
        res.json({_metadata: metadata, records: issues});
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: `Internal server error: ${err}`});
    });
});

app.post('/api/v1/issues', (req, res) => {
    const newIssue = req.body;
    // console.log(newIssue);
    // newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if(!newIssue.status){
        newIssue.status = 'New';
    }

    const err = Issue.validateIssue(newIssue);
    if(err) {
        res.status(422).json({message: `Invalid request: ${err}`});
        return;
    }

    let collection = client.db(dbName).collection(collectionName);
    collection.insertOne(newIssue).then(result => {
        // return collection.find({_id: result.insertedId}).limit(1).next();
        return collection.find({_id: result.insertedId}).next();
    }).then(newIssue => {
        console.log(newIssue);
        res.json(newIssue);
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: `Internal server error: ${err}`});
    });
    // issues.push(newIssue);
    // res.json(newIssue);
});




app.listen(3000, function () {
    console.log('app start on 3000');
});





// const issues = [
//     {
//         id: 1,
//         status: 'open',
//         owner: 'Raven',
//         created: new Date("2018-12-22"),
//         effort: 5,
//         completionDate: undefined,
//         title: 'Error in console when clicking Add',
//     },
//     {
//         id: 2,
//         status: 'Assigned',
//         owner: 'Eddie',
//         created: new Date("2018-12-23"),
//         effort: 7,
//         completionDate: new Date("2018-12-30"),
//         title: 'Missing bottom border on panel',
//     },
// ];
