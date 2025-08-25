const result = await plants.updateOne(
  {
    sunlight: "full",
    type: "perennial",
    color: "green",
    _partition: "Store 47",
  },
  { $set: { name: "super sweet basil" } },
  { upsert: true }
);
console.log(result);
