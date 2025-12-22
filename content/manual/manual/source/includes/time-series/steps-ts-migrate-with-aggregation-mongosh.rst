.. procedure::

   .. step:: Create a metadata field.

      If your collection doesn't include a field you can use to identify each
      series, transform your data to define one. In this example, the
      ``metaData`` field becomes the ``metaField`` of the time series collection
      that you create.

      .. include:: /includes/time-series/timeseries-metafield-note.rst

      These aggregation stages perform the following operations:

      - Uses :pipeline:`$addFields` to add a ``metaData`` field to the
        ``weather_data`` collection.
      - Uses :pipeline:`$project` to include or exclude the remaining fields in the
        document.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/migrate-with-aggregation/create-aggregation-pipeline.snippet.add-meta-field.js
         :language: javascript
         :category: syntax example

   .. step:: Create your time series collection.

      Add an :pipeline:`$out` aggregation stage to your pipeline to create a
      time series collection and insert your data into it. The pipeline below
      performs the following operations:

      - Uses :pipeline:`$out` with the
        ``timeseries`` option to create a ``weather_new`` time series collection
        in the ``mydatabase`` database.
      - Defines the ``metaData`` field as the ``metaField`` of
        the ``weather_new`` collection.
      - Defines the ``ts`` field as the ``timeField`` of the
        ``weather_new`` collection.

        .. note::

           The ``timeField`` of a time series collection must be a :ref:`date
           <document-bson-type-date>` type.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/migrate-with-aggregation/create-aggregation-pipeline.snippet.add-out-stage.js
         :language: javascript
         :category: syntax example

      For the aggregation stage syntax, see
      :pipeline:`$out`. For a full explanation of the time series
      options, see the :ref:`Time Series Field Reference
      <time-series-fields>`.

   .. step:: Run your aggregation pipeline.

      Run the complete aggregation pipeline to migrate the data into the new
      time series collection.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/migrate-with-aggregation/create-aggregation-pipeline.snippet.full-pipeline.js
         :language: javascript
         :category: usage example

   .. step:: Review your data.

      After you run this aggregation pipeline, you can use
      :method:`~db.collection.findOne()` to view a document in your
      ``weather_new`` time series collection:

      .. io-code-block::

         .. input:: /code-examples/tested/command-line/mongosh/timeseries/migrate-with-aggregation/query-new-ts-collection.js
            :language: javascript
            :category: usage example

         .. output:: /code-examples/tested/command-line/mongosh/timeseries/migrate-with-aggregation/find-one-output.sh
            :language: shell
