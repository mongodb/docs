const filter = {};
const result = await collection.distinct('my-key', filter, {
  maxTimeMS: 50,
});
