const timeSeriesDB = client.db('timeseries');
const weather = await timeSeriesDB.createCollection('weather', settings);
