const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;
const assert = require('assert');

const user = encodeURIComponent('testuser');
const password = encodeURIComponent('<PASSWORD>');

// Connection URL
const url = f('mongodb://%s:%s@localhost:27017/test?authSource=admin', user, password);


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {

    console.log(url);

    assert.equal(null, err);

    const dbName = "test";

    const db = client.db(dbName);

    db.collection('inventory').insertMany([{
            item: "journal",
            qty: 25,
            size: {
                h: 14,
                w: 21,
                uom: "cm"
            },
            status: "A"
        },
        {
            item: "notebook",
            qty: 50,
            size: {
                h: 8.5,
                w: 11,
                uom: "in"
            },
            status: "A"
        },
        {
            item: "paper",
            qty: 100,
            size: {
                h: 8.5,
                w: 11,
                uom: "in"
            },
            status: "D"
        },
        {
            item: "planner",
            qty: 75,
            size: {
                h: 22.85,
                w: 30,
                uom: "cm"
            },
            status: "D"
        },
        {
            item: "postcard",
            qty: 45,
            size: {
                h: 10,
                w: 15.25,
                uom: "cm"
            },
            status: "A"
        }
    ]).then(function(result) {

    })

    makeCalls();

    async function makeCalls() {

        try {
            const find_1 = await callFind();
            const find_2 = await callFind_1(find_1);
            const find_3 = await callFind_2(find_2);
            const find_4 = await callFind_3(find_3);
            const find_5 = await callFind_5(find_4);
            const find_6 = await callFind_6(find_5);
            const find_7 = await callFind_7(find_6);
            const end = await logAll(find_1, find_2, find_3, find_4, find_5, find_6, find_7);
            client.close();
        } catch (err) {
            console.log(err);
        }

    }

    function logAll(find_1, find_2, find_3, find_4, find_5, find_6, find_7) {
        console.log("*********1*******");
        console.log(find_1);
        console.log("*********2*******");
        console.log(find_2);
        console.log("*********3*******");
        console.log(find_3);
        console.log("*********4*******");
        console.log(find_4);
        console.log("*********5*******");
        console.log(find_5);
        console.log("*********6*******");
        console.log(find_6);
        console.log("*********7*******");
        console.log(find_7);
    }

    function callFind() {
        var cursor = db.collection('inventory').find({});
        return cursor.toArray();
    }

    function callFind_1() {

        var cursor = db.collection('inventory').find({
            status: "D"
        });
        return cursor.toArray();

    }

    function callFind_2(array) {

        var cursor = db.collection('inventory').find({
            size: {
                h: 14,
                w: 21,
                uom: "cm"
            }
        });
        return cursor.toArray();

    }

    function callFind_3(array) {

        var cursor = db.collection('inventory').find({
            "size.uom": "in"
        });
        return cursor.toArray();

    }

    function callFind_4(array) {

        var cursor = db.collection('inventory').find({
            "size.h": {
                $lt: 15
            }
        });
        return cursor.toArray();

    }

    function callFind_5(array) {

        var cursor = db.collection('inventory').find({
            status: "A",
            qty: {
                $lt: 30
            }
        });
        return cursor.toArray();

    }

    function callFind_6(array) {

        var cursor = db.collection('inventory').find({
            $or: [{
                status: "A"
            }, {
                qty: {
                    $lt: 30
                }
            }]
        });
        return cursor.toArray();

    }

    function callFind_7(array) {

        var cursor = db.collection('inventory').find({
            status: "A",
            $or: [{
                qty: {
                    $lt: 30
                }
            }, {
                item: {
                    $regex: "^p"
                }
            }]
        });
        return cursor.toArray();

    }


});
