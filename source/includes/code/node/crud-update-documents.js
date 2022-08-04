// update code goes here
const filter = { };
const updateDoc = {
  $mul: {
      radius: 1.60934
  }
};

const result = await coll.updateMany(filter, updateDoc);
