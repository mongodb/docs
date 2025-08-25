const perennials = await plants.aggregate([
  { $match: { type: { $eq: "perennial" } } },
]);
console.log(perennials);
