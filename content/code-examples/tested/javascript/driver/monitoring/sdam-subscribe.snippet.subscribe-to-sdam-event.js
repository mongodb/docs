const client = new MongoClient(uri);
const eventName = 'serverOpening';

client.on(eventName, (event) =>
  console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`)
);

try {
  await client.db('admin').command({ ping: 1 });
} finally {
  await client.close();
}
