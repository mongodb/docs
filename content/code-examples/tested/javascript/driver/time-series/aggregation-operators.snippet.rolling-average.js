try {
  const pipeline = [
    {
      $setWindowFields: {
        partitionBy: { symbol: '$symbol' },
        sortBy: { date: 1 },
        output: {
          averageMonthClosingPrice: {
            $avg: '$close',
            window: {
              range: [-1, 'current'],
              unit: 'month',
            },
          },
        },
      },
    },
  ];

  const result = await stocksCollection.aggregate(pipeline).toArray();
  return result;
