.. step:: Copy the template app and connect to your deployment.

   a. Paste the following code into a new ``.java`` file.

   #. Replace ``"<connection-string>"`` with your copied connection string.

   As you work with time series code examples, add them between the
   ``// start example code here`` and ``// end example code here`` comments.

   .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SampleApp.snippet.example.java
      :language: java
      :copyable: true
      :category: usage example

.. step:: Add the required imports.

   Add these imports to the top of your sample app file:

   .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.required-imports.java
      :language: java
      :copyable: true
      :category: usage example

.. step:: Access the database.

   .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.create-db.java
      :language: java
      :copyable: true
      :category: syntax example

   This creates a reference to an empty "timeseries" database.

.. step:: Create an empty time series collection.

   .. note::

      This exercise uses :ref:`stock ticker sample data
      <ts-quick-start-sample-data>`. The ``date`` field stores time data, and
      the ``ticker`` field identifies the individual stock.

   a. Set the ``timeField``, ``metaField``, and ``granularity``:

      .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.collection-options.java
         :language: java
         :copyable: true
         :category: syntax example

   #. Create the collection using the ``db.createCollection()`` method:

      .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.create-collection.java
         :language: java
         :copyable: true
         :category: syntax example

      This creates an empty time series collection named ``stocks``.

.. step:: Add sample documents.

   Use the ``db.collection.insertMany()`` method to add the
   following sample documents to the collection:

   .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.load-sample-data.java
      :language: java
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

      .. input:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.metafield-query.java
         :language: java
         :category: syntax example

      .. output:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/MetaFieldOutput.txt
         :language: text

   To query the ``timeField`` for a time span:

   .. io-code-block::
      :copyable: true

      .. input:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/Tutorial.snippet.timefield-query.java
         :language: java
         :category: syntax example

      .. output:: /code-examples/tested/java/driver-sync/timeseries/QuickStart/TimeFieldOutput.txt
         :language: text
