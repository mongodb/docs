const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const agg = [
    {
      '$search': {
        'index': 'embedded-documents-tutorial',
        'embeddedDocument': {
          'path': 'clubs.sports', 
          'operator': {
            'queryString': {
              'defaultPath': 'clubs.sports.club_name', 
              'query': 'dodgeball OR frisbee'
            }
          }
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'name': 1, 
        'clubs.sports': 1, 
        'score': {
          '$meta': 'searchScore'
        }
      }
    }
  ];

MongoClient.connect(
  "<connection-string>",
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("local_school_district").collection("schools");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
