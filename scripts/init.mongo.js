db = new Mongo().getDB('issueTracker');

db.issues.remove({});

db.issues.insert([
    {
        id: 1,
        status: 'open',
        owner: 'Raven',
        created: new Date("2018-12-22"),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date("2018-12-23"),
        effort: 7,
        completionDate: new Date("2018-12-30"),
        title: 'Missing bottom border on panel',
    },
]);

db.issues.createIndex({status:1});
db.issues.createIndex({owner:1});
db.issues.createIndex({created:1});