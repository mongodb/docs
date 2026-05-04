.. step:: Copy the template app and connect to your deployment.

   a. Paste the following code into a new ``.cs`` file.

   #. Replace ``"<connection-string>"`` with your copied connection string.

   As you work with time series code examples, add them between the
   ``// start example code here`` and ``// end example code here`` comments.

   .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/SampleApp.snippet.example.cs
      :language: csharp
      :copyable: true
      :category: usage example

.. step:: Create a data model.

   .. note::

      This exercise uses :ref:`stock ticker sample data
      <ts-quick-start-sample-data>`. The ``date`` field stores time data, and
      the ``ticker`` field identifies the individual stock.

   Create a C# class to model the data in the ``stocks`` collection:

   .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Stocks.snippet.model.cs
      :language: csharp
      :copyable: true
      :category: usage example

.. step:: Access the database.

   .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.access-db.cs
      :language: csharp
      :copyable: true
      :category: syntax example

   This creates a reference to an empty "timeseries" database.

.. step:: Create an empty time series collection.

   a. Set the ``timeField`` and ``metaField``. You can optionally set the
      ``granularity`` field.

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.collection-options.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   #. Create the collection using the ``db.createCollection()`` method:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.create-collection.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      This creates an empty time series collection named ``stocks``.

.. step:: Add sample documents.

   Use the ``InsertMany()`` method to add the
   following sample documents to the collection:

   .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.load-sample-data.cs
      :language: csharp
      :copyable: true
      :category: usage example

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

      .. input:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.metafield-query.cs
         :language: csharp
         :category: syntax example

      .. output:: /code-examples/tested/csharp/driver/TimeSeries/OutputFiles/MetaFieldQueryOutput.txt
         :language: text

   To query the ``timeField`` for a time span:

   .. io-code-block::
      :copyable: true

      .. input:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.timefield-query.cs
         :language: csharp
         :category: syntax example

      .. output:: /code-examples/tested/csharp/driver/TimeSeries/OutputFiles/TimeFieldQueryOutput.txt
         :language: text
