Calculate Average Price per Month
`````````````````````````````````

Consider a ``dowJonesTickerData`` collection that contains
documents with the following structure:

.. code-block:: javascript
   :copyable: false

   {
      date: ISODate("2020-01-03T05:00:00.000Z"),
      symbol: 'AAPL',
      volume: 146322800,
      open: 74.287498,
      adjClose: 73.486023,
      high: 75.144997,
      low: 74.125,
      close: 74.357498
   }

This aggregation pipeline performs the following actions:

- Uses :expression:`$dateTrunc` to truncate each document's ``date`` to the
  appropriate month.
- Uses :pipeline:`$group` to group the documents by month and symbol. 
- Uses :group:`$avg` to calculate the average price per month. 

.. code-block:: javascript

   db.dowJonesTickerData.aggregate( [ {
      $group: {
         _id: {
            firstDayOfMonth: {
               $dateTrunc: {
                  date: "$date",
                  unit: "month"
               }
            },
            symbol: "$symbol"
         },
         avgMonthClose: {
            $avg: "$close"
         }
      }
   } ] )

The pipeline returns a set of documents where each document contains the
average closing price per month for a particular stock. 

.. code-block:: javascript
   :copyable: false

   {
      _id: {
         firstDayOfMonth: ISODate("2020-06-01T00:00:00.000Z"),
         symbol: 'GOOG'
      },
      avgMonthClose: 1431.0477184545455
   },
   {
      _id: {
         firstDayOfMonth: ISODate("2021-07-01T00:00:00.000Z"),
         symbol: 'MDB'
      },
      avgMonthClose: 352.7314293333333
   },
   {
      _id: {
         firstDayOfMonth: ISODate("2021-06-01T00:00:00.000Z"),
         symbol: 'MSFT'
      },
      avgMonthClose: 259.01818086363636
   }


Calculate a Rolling Average Over 30 Days
````````````````````````````````````````

Consider a ``dowJonesTickerData`` collection that contains
documents with the following structure:

.. code-block:: javascript
   :copyable: false

   {
      date: ISODate("2020-01-03T05:00:00.000Z"),
      symbol: 'AAPL',
      volume: 146322800,
      open: 74.287498,
      adjClose: 73.486023,
      high: 75.144997,
      low: 74.125,
      close: 74.357498
   }

This aggregation pipeline performs the following operations:

- Uses :pipeline:`$setWindowFields` to specify a window of 30 days.
- Calculates a rolling average of the closing price over the last 30
  days for each stock.

.. code-block:: javascript

   db.dowJonesTickerData.aggregate( [
      { $setWindowFields: {
         partitionBy: { symbol : "$symbol" } ,
         sortBy: { date: 1 },
         output: {
            averageMonthClosingPrice: {
               $avg : "$close",
               window : { range : [-1, "current"], unit : "month" }

            } 
         } 
      } }
   ] )

The pipeline returns a set of documents where each document includes a
``$averageMonthClosingPrice`` field that contains the average of the
previous month's closing price for that stock symbol. 

.. code-block:: javascript
   :copyable: false
   :emphasize-lines: 10

   {
      date: ISODate("2020-01-29T05:00:00.000Z"),
      symbol: 'AAPL',
      volume: 216229200,
      adjClose: 80.014801,
      low: 80.345001,
      high: 81.962502,
      open: 81.112503,
      close: 81.084999,
      averageMonthClosingPrice: 77.63137520000001
   }
