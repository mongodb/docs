// find code goes here
const cursor = coll.find({ "surfaceTemperatureC.mean": { $lt: 15 } });
