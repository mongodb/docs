const sampleDocuments = [
  {
    ticker: 'MDB',
    date: new Date(2021, 11, 18, 15, 59, 0, 0),
    close: 252.47,
    volume: 55046.0,
  },
  {
    ticker: 'MDB',
    date: new Date(2021, 11, 18, 15, 58, 0, 0),
    close: 252.93,
    volume: 44042.0,
  },
  {
    ticker: 'MDB',
    date: new Date(2021, 11, 18, 15, 57, 0, 0),
    close: 253.61,
    volume: 40182.0,
  },
  {
    ticker: 'MDB',
    date: new Date(2021, 11, 18, 15, 56, 0, 0),
    close: 253.63,
    volume: 27890.0,
  },
  {
    ticker: 'MDB',
    date: new Date(2021, 11, 18, 15, 55, 0, 0),
    close: 254.03,
    volume: 40270.0,
  },
];

const result = await stocks.insertMany(sampleDocuments);
