.. step:: Copy the template app and connect to your deployment.

   a. Paste the following code into a new ``.js`` file.

   #. Replace ``"<connection-string>"`` with your copied connection string.

   As you work with time series code examples, add them between the
   ``// start example code here`` and ``// end example code here`` comments.

   .. literalinclude:: /code-examples/tested/javascript/driver/time-series/sample-app.snippet.example.js
      :language: javascript
      :copyable: true
      :category: usage example

.. step:: Create a new database.

   .. literalinclude:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-setup.snippet.create-db.js
      :language: javascript
      :copyable: true
      :category: syntax example

   This creates a reference to an empty "timeseries" database.

.. step:: Create an empty time series collection.

   .. note::

      This exercise uses :ref:`stock ticker sample data
      <ts-quick-start-sample-data>`. The ``date`` field stores time data, and
      the ``ticker`` field identifies the individual stock.

   a. Set the ``timeField``, ``metaField``, and ``granularity``:

      .. literalinclude:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-setup.snippet.set-coll-options.js
         :language: javascript
         :copyable: true
         :category: syntax example

   #. Create the collection using the ``db.createCollection()`` method:

      .. literalinclude:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-setup.snippet.create-collection.js
         :language: javascript
         :copyable: true
         :category: syntax example

      This creates an empty time series collection named ``stocks``.

.. step:: Add sample documents.

   Use the ``db.collection.insertMany()`` method to add the
   following sample documents to the collection:

   .. literalinclude:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-setup.snippet.load-sample-data.js
      :language: javascript
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

      .. input:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start.snippet.meta-field-query.js
         :language: javascript
         :category: syntax example

      .. output:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-meta-field-output.sh
         :language: shell

   To query the ``timeField`` for a time span:

   .. io-code-block::
      :copyable: true

      .. input:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start.snippet.time-field-query.js
         :language: javascript
         :category: syntax example

      .. output:: /code-examples/tested/javascript/driver/time-series/quick-start/quick-start-time-field-output.sh
         :language: shell
