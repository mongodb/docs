const result = await plants.updateMany(
  { _partition: "Store 42" },
  { $set: { _partition: "Store 51" } }
);
console.log(result);
