Each of the following examples uses a ``dowJonesTickerData`` collection that contains
documents with the following structure:

.. literalinclude:: /code-examples/tested/python/pymongo/timeseries/aggregation_operators.snippet.stocks-schema.py
   :language: python
   :category: usage example


Calculate Average Price per Month
`````````````````````````````````

This example aggregation pipeline performs the following actions:

- Uses :expression:`$dateTrunc` to truncate each document's ``date`` to the
  appropriate month.
- Uses :pipeline:`$group` to group the documents by month and symbol. 
- Uses :group:`$avg` to calculate the average price per month. 

The pipeline returns a set of documents where each document contains the
average closing price per month for a particular stock. 


.. io-code-block:: 
   :copyable: true

   .. input:: /code-examples/tested/python/pymongo/timeseries/aggregation_operators.snippet.pipeline-avg-monthly-price.py
      :language: python
      :category: usage example

   .. output:: /code-examples/tested/python/pymongo/timeseries/ts-pipeline-average-price-output.txt
      :language: json


Calculate a Rolling Average Over 30 Days
````````````````````````````````````````

The next example aggregation pipeline performs the following operations:

- Uses :pipeline:`$setWindowFields` to specify a window of 30 days.
- Calculates a rolling average of the closing price over the last 30
  days for each stock.

The pipeline returns a set of documents where each document includes a
``$averageMonthClosingPrice`` field that contains the average of the
previous month's closing price for that stock symbol. 

.. io-code-block:: 
   :copyable: true

   .. input:: /code-examples/tested/python/pymongo/timeseries/aggregation_operators.snippet.pipeline-rolling-average.py
      :language: python
      :category: usage example

   .. output:: /code-examples/tested/python/pymongo/timeseries/ts-pipeline-rolling-average-output.txt
      :language: json