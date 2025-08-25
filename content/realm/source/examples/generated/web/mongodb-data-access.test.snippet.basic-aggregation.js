const result = await plants.aggregate([
  {
    $group: {
      _id: "$type",
      total: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
]);
console.log(result);
