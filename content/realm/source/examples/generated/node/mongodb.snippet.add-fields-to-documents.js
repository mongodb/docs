const result = await plants.aggregate([
  {
    $addFields: {
      storeNumber: {
        $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
      },
    },
  },
]);
console.log(result);
