const client = new MongoClient(uri, { monitorCommands: true });
const eventName = 'commandStarted';

client.on(eventName, (event) =>
  console.log('\nreceived event:\n', event)
);

try {
  await client.db('admin').command({ ping: 1 });
} finally {
  await client.close();
}
