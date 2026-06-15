import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

export async function subscribeToSdamEvent() {
  const events = [];

  // :snippet-start: subscribe-to-sdam-event
  const client = new MongoClient(uri);
  const eventName = 'serverOpening';

  // :uncomment-start:
  // client.on(eventName, (event) =>
  //   console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`)
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
