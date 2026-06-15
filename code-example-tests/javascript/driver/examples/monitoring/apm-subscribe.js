import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

export async function subscribeToCommandEvent() {
  const events = [];

  // :snippet-start: subscribe-to-apm-event
  const client = new MongoClient(uri, { monitorCommands: true });
  const eventName = 'commandStarted';

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
