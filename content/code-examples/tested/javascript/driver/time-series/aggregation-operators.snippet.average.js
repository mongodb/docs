const pipeline = [
  {
    $group: {
      _id: {
        firstDayOfMonth: {
          $dateTrunc: {
            date: '$date',
            unit: 'month',
          },
        },
        symbol: '$symbol',
      },
      avgMonthClose: { $avg: '$close' },
    },
  },
];
const result = await stocksCollection.aggregate(pipeline).toArray();
return result;
