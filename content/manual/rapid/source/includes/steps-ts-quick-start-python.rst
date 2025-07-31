.. step:: Copy the template app and connect to your deployment.

   a. Paste the following code into a new ``.py`` file.

   #. Replace ``"<connection-string>"`` with your copied connection string.

   #. As you work with time series code examples, add them between the
      ``# start example code here`` and ``# end example code here`` comments.

   .. literalinclude:: /code-examples/tested/python/pymongo/sample_app.snippet.app.py
      :language: python
      :copyable: true
      :category: usage example
      :dedent:

.. step:: Create a new database.

   .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.create-db.py
      :language: python
      :copyable: true
      :category: syntax example
      :dedent:

   This creates a reference to an empty "timeseries" database.

.. step:: Create an empty time series collection.

   .. note::
   
      This exercise uses :ref:`stock ticker sample data  
      <ts-quick-start-sample-data>`. The ``date`` field stores time data, and
      the ``ticker`` field identifies the individual stock.

   a. Set the ``timeField``, ``metaField``, and ``granularity``:

      .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.set-ts-options.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

   #. Create the collection using the ``db.create_collection()`` method:

      .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.create-coll.py
         :language: python
         :copyable: true
         :category: syntax example
         :dedent:

      This creates an empty time series collection named ``stocks``.

.. step:: Add sample documents.

   Use the ``db.collection.insert_many()`` method to add the
   following sample documents to the collection:

   .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.add-sample-docs.py
      :language: python
      :copyable: true
      :category: usage example
      :dedent:

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

   .. io-code-block::
      :copyable: true

      .. input:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.query-meta.py
         :language: python
         :category: syntax example

      .. output:: /code-examples/tested/python/pymongo/timeseries/ts-quick-start-metafield-output.txt
         :language: python

   To query the ``timeField`` for a time span:

   .. io-code-block::
      :copyable: true

      .. input:: /code-examples/tested/python/pymongo/timeseries/ts_quick_start.snippet.query-time.py
         :language: python
         :category: syntax example

      .. output:: /code-examples/tested/python/pymongo/timeseries/ts-quick-start-timefield-output.txt
         :language: python
