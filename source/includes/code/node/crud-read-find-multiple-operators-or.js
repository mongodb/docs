// find code goes here
const cursor = coll.find({
  $or: [{ orderFromSun: { $gt: 7 } }, { orderFromSun: { $lt: 2 } }],
});
