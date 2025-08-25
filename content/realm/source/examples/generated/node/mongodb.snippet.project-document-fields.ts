const result = await plants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      storeNumber: {
        $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
      },
    },
  },
]);
console.log(result);
