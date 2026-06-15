const client = new MongoClient(uri);
const eventName = 'connectionPoolCreated';

client.on(eventName, (event) =>
  console.log('\nreceived event:\n', event)
);

try {
  await client.db('admin').command({ ping: 1 });
} finally {
  await client.close();
}
