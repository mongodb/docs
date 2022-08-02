// delete code goes here
const doc = {
  orbitalPeriod: {
    $gt: 5,
    $lt: 85
  }
};

const result = await coll.deleteMany(doc);
