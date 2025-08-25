const result = await plants.updateOne(
  { name: "petunia" },
  { $set: { sunlight: "partial" } }
);
console.log(result);
