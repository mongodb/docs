const timeseriesDb = client.db('mydatabase');
const weatherNewColl = timeseriesDb.collection('weather_new');

const result = await weatherNewColl.findOne();
