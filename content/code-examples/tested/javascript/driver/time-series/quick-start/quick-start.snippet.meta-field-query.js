const metafieldResults = await stocks.find(
  { ticker: 'MDB' },
  { projection: { _id: 0 } }
);
