.. code-block:: javascript

   db.stockSales.insertMany( [
      { _id: 0, symbol: "MDB", saleTimestamp: Timestamp(1622731060, 1) },
      { _id: 1, symbol: "MDB", saleTimestamp: Timestamp(1622731060, 2) },
      { _id: 2, symbol: "MSFT", saleTimestamp: Timestamp(1714124193, 1) },
      { _id: 3, symbol: "MSFT", saleTimestamp: Timestamp(1714124193, 2) },
      { _id: 4, symbol: "MSFT", saleTimestamp: Timestamp(1714124193, 3) }
   ] )
