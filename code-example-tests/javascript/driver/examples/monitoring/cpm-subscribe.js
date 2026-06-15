import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

export async function subscribeToConnectionPoolEvent() {
  const events = [];

  // :snippet-start: subscribe-to-cpm-event
  const client = new MongoClient(uri);
  const eventName = 'connectionPoolCreated';

  // :uncomment-start:
  // client.on(eventName, (event) =>
  //   console.log('\nreceived event:\n', event)
  // );
  // :uncomment-end:
  client.on(eventName, (event) => events.push(event)); // :remove:

  try {
    await client.db('admin').command({ ping: 1 });
  } finally {
    await client.close();
  }
  // :snippet-end:

  return events;
}
