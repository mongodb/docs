const result = await plants.aggregate([
  { $group: { _id: "$type", colors: { $addToSet: "$color" } } },
  { $unwind: { path: "$colors" } },
  { $sort: { _id: 1, colors: 1 } },
]);
console.log(result);
