// :replace-start: {
//   "terms": {
//     "const cursor = ": ""
//   }
// }

import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runMigrationAggregation() {
  try {
    await client.connect();
    // :snippet-start: run-aggregation
    const timeseriesDb = client.db('mydatabase');
    const weatherDataColl = timeseriesDb.collection('weather_data');

    const pipeline = [
      // :snippet-start: add-meta-field
      {
        $addFields: {
          metaData: {
            st: '$st',
            position: '$position',
            elevation: '$elevation',
            callLetters: '$callLetters',
            qualityControlProcess: '$qualityControlProcess',
            type: '$type',
          },
        },
      },
      {
        $project: {
          _id: 1,
          ts: 1,
          metaData: 1,
          dataSource: 1,
          airTemperature: 1,
          dewPoint: 1,
          pressure: 1,
          wind: 1,
          visibility: 1,
          skyCondition: 1,
          sections: 1,
          precipitationEstimatedObservation: 1,
        },
      },
      // :snippet-end:
      // :snippet-start: add-out-stage
      {
        $out: {
          db: 'mydatabase',
          coll: 'weather_new',
          timeseries: {
            timeField: 'ts',
            metaField: 'metaData',
            granularity: 'seconds',
          },
        },
      },
      // :snippet-end:
    ];

    const cursor = weatherDataColl.aggregate(pipeline);
    // :snippet-end:
    await cursor.toArray();
  } catch (error) {
    console.error('Error running aggregation:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function queryNewTsCollection() {
  try {
    await client.connect();
    // :snippet-start: query-new-ts-collection
    const timeseriesDb = client.db('mydatabase');
    const weatherNewColl = timeseriesDb.collection('weather_new');

    const result = await weatherNewColl.findOne();
    // :snippet-end:
    return result;
  } catch (error) {
    console.error('Error querying new time series collection:', error);
    throw error;
  } finally {
    await client.close();
  }
}
// :replace-end:
