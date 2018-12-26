'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.get("/hello", function (req, res) {
    res.send('Hello!');
    // console.log(req.query, req.header, req.path, req.url, req.body);
});

var validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

var issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
};

function validateIssue(issue) {
    for (var field in issueFieldType) {
        var type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return field + ' is required';
        }
    }
    if (!validIssueStatus[issue.status]) {
        return issue.status + ' is not a valid status';
    }

    return null; //for functional programming?
}

var issues = [{
    id: 1,
    status: 'open',
    owner: 'Raven',
    created: new Date("2018-12-22"),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
}, {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date("2018-12-23"),
    effort: 7,
    completionDate: new Date("2018-12-30"),
    title: 'Missing bottom border on panel'
}];

var url = 'mongodb://localhost:27017';
var dbName = 'issueTracker';
var collectionName = "issues";
var client = new MongoClient(url, { useNewUrlParser: true });
client.connect().catch(function (err) {
    return console.log(err);
});

function testWithPromises() {
    var db = void 0;
    client.connect().then(function () {
        db = client.db(dbName);
        return db.collection(collectionName).insertOne({ id: 1, name: "A. Callback" });
    }).then(function (result) {
        console.log('Result of insert: ' + result.insertedId);
        return db.collection(collectionName).find({ id: 1 }).toArray();
    }).then(function (docs) {
        console.log('Result of find: ' + JSON.stringify(docs));
        return client.close();
    }).catch(function (err) {
        console.log('ERROR', err);
    });
}

app.get('/api/v1/issues', function (req, res) {
    var db = client.db(dbName);
    db.collection(collectionName).find().toArray().then(function (issues) {
        // console.log(issues);
        var metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error: ' + err });
    });
});

app.post('/api/v1/issues', function (req, res) {
    var newIssue = req.body;
    // console.log(newIssue);
    // newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }

    var err = validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: 'Invalid request: ' + err });
        return;
    }

    var collection = client.db(dbName).collection(collectionName);
    collection.insertOne(newIssue).then(function (result) {
        // return collection.find({_id: result.insertedId}).limit(1).next();
        return collection.find({ _id: result.insertedId }).next();
    }).then(function (newIssue) {
        console.log(newIssue);
        res.json(newIssue);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error: ' + err });
    });
    // issues.push(newIssue);
    // res.json(newIssue);
});

app.listen(3000, function () {
    console.log('app start on 3000');
});