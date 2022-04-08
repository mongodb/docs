// delete code goes here
const doc = {
  OrbitalPeriod: {
    $gt: 5,
    $lt: 85
  }
};

const result = await coll.deleteMany(doc);
