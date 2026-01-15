.. procedure::

   .. step:: Create a metadata field.

      If your collection doesn't include a field you can use to identify each
      series, transform your data to define one. In this example, we create a
      ``metaData`` field that will be used for the ``metaField`` property of the 
      time series collection we will later create.

      .. include:: /includes/time-series/timeseries-metafield-note.rst

      These aggregation stages perform the following operations:

      - Uses :pipeline:`$set` to add a ``metaData`` field.

      - Uses :pipeline:`$project` to include the remaining fields in the
        document.

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/MigrateWithAggregation/MigrateTimeSeriesCollection.snippet.add-meta-field.cs
         :language: csharp
         :category: syntax example

      .. note::

         The ``timeField`` of a time series collection must be a :ref:`date
         <document-bson-type-date>` type.

   .. step:: Create your time series collection.

      Before you can output data to a time series collection, you must create
      the collection with the appropriate options. In this example, we create 
      a ``TimeSeriesOptions`` object to define the time series options for the new
      collection, and then create the collection using those options:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/MigrateWithAggregation/MigrateTimeSeriesCollection.snippet.create-timeseries-simple.cs
         :language: csharp
         :category: syntax example

      Then, add an :pipeline:`$out` aggregation stage 
      to your pipeline that outputs to the new time series collection. Create the 
      output, and then concatenate it to your existing aggregation pipeline:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/MigrateWithAggregation/MigrateTimeSeriesCollection.snippet.add-out-stage.cs
         :language: csharp
         :category: syntax example

      For a full explanation of the time series options, see the 
      :ref:`Time Series Field Reference <time-series-fields>`.

   .. step:: Run your aggregation pipeline.

      To run the complete aggregation pipeline to migrate the data into the new
      time series collection, call one of the methods that implements ``IEnumerable``, 
      such as ``ToList``, ``ToArray``, or ``ToEnumerable`` on the pipeline 
      object. The following example shows the complete aggregation pipeline, 
      including this final step:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/MigrateWithAggregation/MigrateTimeSeriesCollection.snippet.complete-agg-example.cs
         :language: csharp
         :category: usage example

   .. step:: Review your data.

      After you run this aggregation pipeline, you can use the standard MongoDB query
      methods to review the data in your new time series collection. 
      The following example shows how to use the ``Find`` and ``ToList``
      methods to view a document in your ``weather_new`` time series collection:

      .. io-code-block::

         .. input:: /code-examples/tested/csharp/driver/TimeSeries/MigrateWithAggregation/MigrateTimeSeriesCollection.snippet.query-new-ts-collection.cs
            :language: csharp
            :category: usage example

         .. output:: /code-examples/tested/csharp/driver/TimeSeries/OutputFiles/MigrateAggOutput.txt
            :language: json
