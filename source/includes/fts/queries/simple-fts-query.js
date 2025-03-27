import { MongoClient } from "mongodb";

const agg = [
  {
    $search: {
      text: {
        query: "baseball",
        path: "plot",
      },
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1,
    },
  },
];

const client = new MongoClient("<connection-string>")
const coll = client.db("sample_mflix").collection("movies");
const cursor = coll.aggregate(agg);
for await (const doc of cursor) {
    console.log(doc)
}
await client.close();

