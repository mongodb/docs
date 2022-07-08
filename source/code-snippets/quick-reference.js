// ignored first line
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "<connection URI>";

const client = new MongoClient(uri);

async function query(coll) {
  await console.log("findOne");
  const result = await coll.findOne({ title: 'Hamlet' });
  await console.dir(result);
}

async function queryMany(coll) {
  await console.log("find");
  const cursor = await coll.find({ year: 2005 });
  await cursor.forEach(console.dir);
}

async function insertOne(coll) {
  const result = await coll.insertOne({
    title: 'Jackie Robinson',
  });
  await console.dir(result);
}
async function insertMany(coll) {
  const result = await coll.insertMany([
    { title: 'Dangal', rating: 'Not Rated' },
    { title: 'The Boss Baby', rating: 'PG' }
  ]);
  await console.dir(result);
}

async function updateOne(coll) {
  const result = await coll.updateOne(
    { title: 'Amadeus' },
    { $set: { 'imdb.rating': 9.5 } }
  );
  await console.dir(result);
}

async function updateMany(coll) {
  const result = await coll.updateMany(
    { year: 2001 },
    { $inc: { 'imdb.votes': 100 } }
  );

  await console.dir(result);
}

async function updateArrayElement(coll) {
  const result = await coll.updateOne(
    { title: 'Cosmos' },
    { $push: { genres: 'Educational' } }
  );
  await console.dir(result);

  const findResult = await coll.findOne({title: 'Cosmos'});
  await console.dir(findResult);
}

async function replaceDocument(coll) {
  const result = await coll.replaceOne(
                { name: 'Deli Llama', address: '2 Nassau St' },
                { name: 'Lord of the Wings', zipcode: 10001 },
                { upsert: true}
             );
  await console.dir(result);

  const findResult = await coll.findOne({name: 'Lord of the Wings'});
  await console.dir(findResult);
}

async function deleteOne(coll) {
  const result = await coll.deleteOne({ title: 'Congo' });
  await console.dir(result);
}

async function deleteMany(coll) {
  const result = await coll.deleteMany({ title: { $regex: /^Shark.*/ } });
  await console.dir(result);
}

async function bulkWriteExample(coll) {
  const result = await coll.bulkWrite([
    {
      insertOne: {
        document: {
          title: 'A New Movie',
          year: 2022
        }
      }
    },
    {
      deleteMany: {
        filter: { year: { $lt: 1970 } }
      }
    }
  ]);
  await console.dir(result);
}

async function watchStart(coll) {
  coll.watch([ { $match: { year: { $gte: 2022 } } } ]);
}

async function accessCursorIterative(coll) {
  const cursor = coll.find().limit(10);
  await cursor.forEach(console.dir);
}

async function accessCursorArray(coll) {
  const cursor = coll.find().limit(10);
  const results = await cursor.toArray();
  console.log(results);
}

async function createIndex(coll) {
  const result = await coll.createIndex({'title':1 , 'year':-1});
  await console.dir(result);
}

async function countExample(coll) {
  const result = await coll.countDocuments({year: 2000});
  await console.dir(result);
}

async function skipExample(coll) {
  const cursor = await coll.find({title: {$regex: /^Rocky/ }}, { skip: 2 });
  await console.dir(await cursor.toArray());
}

async function sortExample(coll) {
  const cursor = await coll.find().limit(50).sort({ year: 1});
  await cursor.forEach(console.dir);
}

async function projectExample(coll) {
  const cursor = coll.find().project({ _id: 0, year: 1, imdb: 1 });
  await cursor.forEach(console.dir);
}

async function searchText(coll) {
  const result = await coll.find({$text: { $search: 'zissou' }}).limit(30).project({title: 1});
  await result.forEach(console.dir);
}

async function distinct(coll) {
  const result = await coll.distinct('year');
  await console.log(result);
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    //await count(collection);
    //await query(collection);
    //await queryMany(collection);
    //await insertOne(collection);
    //await insertMany(collection);
    //await updateOne(collection);
    //await updateMany(collection);
    //await updateArrayElement(collection);
    //await replaceDocument(collection);
    //await deleteOne(collection);
    //await deleteMany(collection);
    //await bulkWriteExample(collection);
    //await watchStart(collection);
    //await accessCursorIterative(collection);
    //await accessCursorArray(collection);
    //await countExample(collection);
    //await skipExample(collection);
    //await sortExample(collection);
    //await projectExample(collection);
    //await createIndex(collection);
    //await searchText(collection);
    //await distinct(collection);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
