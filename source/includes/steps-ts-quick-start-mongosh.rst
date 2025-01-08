.. step:: Open a new terminal window and connect to your deployment.

   Use :binary:`mongosh` to connect to your self-managed or Atlas deployment. 
   For example:

   .. code-block:: bash
      :copyable: true

      mongosh "mongodb+srv://my-test-cluster.1twap.mongodb.net/" --apiVersion 1
      --username <user>

.. step:: Create a new database.

   .. code-block:: bash
      :copyable: true

      use timeseries

   This creates and switches to an empty "timeseries" database.

.. step:: Create an empty time series collection.

   .. note::
   
      This exercise uses :ref:`stock ticker sample data  
      <ts-quick-start-sample-data>`. The ``date`` field stores time data, and
      the ``ticker`` field identifies the individual stock.

   a. Set the ``timeField``, ``metaField``, and ``granularity``:

      .. code-block:: javascript
         :copyable: true

         timeseries: {
            timeField: "date",
            metaField: "ticker",
            granularity: "seconds"
         }

      **OR** specify custom granularity:

      .. versionadded:: 6.3

      .. code-block:: javascript
         :copyable: true
         :emphasize-lines: 4,5

         timeseries: {
            timeField: "date",
            metaField: "ticker",
            granularity: "seconds",
            bucketMaxSpanSeconds: "300",
            bucketRoundingSeconds: "300"
         }

   #. Create the collection using the :method:`db.createCollection()` method:

      .. code-block:: bash
         :copyable: true

         db.createCollection(
            "stocks",
            {
               timeseries: {
                  timeField: "date",
                  metaField: "ticker",
                  granularity: "seconds"
               }
            })

      This creates an empty time series collection named ``stocks``.

.. step:: Add sample documents.

   Run the :method:`db.insertMany()` method to add the
   following sample documents to the collection:

   .. code-block:: bash
      :copyable: true

      db.stocks.insertMany([
         { ticker: "MDB", date: ISODate("2021-12-18T15:59:00.000Z"), close: 252.47, volume: 55046.00}, 
         { ticker: "MDB", date: ISODate("2021-12-18T15:58:00.000Z"), close: 252.93, volume: 44042.00}, 
         { ticker: "MDB", date: ISODate("2021-12-18T15:57:00.000Z"), close: 253.61, volume: 40182.00}, 
         { ticker: "MDB", date: ISODate("2021-12-18T15:56:00.000Z"), close: 253.63, volume: 27890.00}, 
         { ticker: "MDB", date: ISODate("2021-12-18T15:55:00.000Z"), close: 254.03, volume: 40270.00}
      ])

   If you are running MongoDB on Atlas, you can click 
   :guilabel:`Browse collections` to view the sample data.

.. step:: Query the data.

   You query a time series collection like any other MongoDB collection. For
   more information, see :ref:`About Querying Time Series Data
   <timeseries-querying>`.
   
   Common queries for time series data are querying the ``metaField``
   to get data for a single time series, or using a range query on the
   ``timeField`` to get data for a given time span. 
   
   To query the ``metaField`` for a single time series:

   .. code-block:: bash
      :copyable: true

      db.stocks.find( { ticker: "MDB" } )
   
   To query the ``timeField`` for a time span:

   .. code-block:: bash
      :copyable: true

      db.stocks.find({ date : {
         $gte : ISODate("2021-12-18T15:50:00.000Z"), 
         $lte : ISODate("2021-12-18T15:56:00.000Z")}
      });