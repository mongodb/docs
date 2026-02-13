import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);
const db = client.db('timeseries_db');
const collectionName = 'dowJonesSymbolData';
const stocksCollection = db.collection(collectionName);

export async function runAverageAggregation() {
  await loadSampleData();
  try {
    // :snippet-start: average
    const pipeline = [
      {
        $group: {
          _id: {
            firstDayOfMonth: {
              $dateTrunc: {
                date: '$date',
                unit: 'month',
              },
            },
            symbol: '$symbol',
          },
          avgMonthClose: { $avg: '$close' },
        },
      },
    ];
    const result = await stocksCollection.aggregate(pipeline).toArray();
    return result;
    // :snippet-end:
  } catch (error) {
    console.error('Error running aggregation:', error);
    throw error;
  } finally {
  }
}

export async function runRollingAveragePipeline() {
  await loadSampleData();
  // :snippet-start: rolling-average
  try {
    const pipeline = [
      {
        $setWindowFields: {
          partitionBy: { symbol: '$symbol' },
          sortBy: { date: 1 },
          output: {
            averageMonthClosingPrice: {
              $avg: '$close',
              window: {
                range: [-1, 'current'],
                unit: 'month',
              },
            },
          },
        },
      },
    ];

    const result = await stocksCollection.aggregate(pipeline).toArray();
    return result;
    // :snippet-end:
  } catch (error) {
    console.error('Error running aggregation:', error);
    throw error;
  }
}

export async function cleanup() {
  await client?.close();
}

export async function loadSampleData() {
  try {
    await client.connect();

    // Clear existing data
    await stocksCollection.deleteMany({});

    // Sample data
    const sampleData = [
      // :snippet-start: stocks-schema
      {
        symbol: 'MDB',
        date: new Date('2021-12-18T15:59:00Z'),
        close: 252.47,
        volume: 55046.0,
      },
      // :snippet-end:
      {
        symbol: 'MDB',
        date: new Date('2021-12-18T15:58:00Z'),
        close: 252.94,
        volume: 44042.0,
      },
      {
        symbol: 'GOOG',
        date: new Date('2021-12-18T15:57:00Z'),
        close: 253.62,
        volume: 40182.0,
      },
      {
        symbol: 'MSFT',
        date: new Date('2021-12-18T15:56:00Z'),
        close: 253.63,
        volume: 27890.0,
      },
      {
        symbol: 'MSFT',
        date: new Date('2021-12-18T15:55:00Z'),
        close: 254.03,
        volume: 40270.0,
      },
    ];

    // Insert sample data
    await stocksCollection.insertMany(sampleData);
  } catch (error) {
    console.error('Error loading sample data:', error);
    throw error;
  } finally {
  }
}
