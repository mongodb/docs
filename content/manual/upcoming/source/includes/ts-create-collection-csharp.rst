Configure the settings for your time series collection:

.. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/CreateAndPopulateTimeSeriesCollection.snippet.create-timeseries-collection-options.cs
   :language: csharp
   :copyable: true
   :category: syntax example

The steps below outline how to effectively configure a time series collection's
settings.

Configure a Time Series Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step::

      Define the ``timeField`` as the field that contains time data and
      the ``metaField`` as the field that contains metadata.

      In the example above, ``timestamp`` is the name of the ``timeField``
      and ``sensorId`` is the name of the ``metaField``. The value of the
      ``timeField`` field must be a :ref:`date <document-bson-type-date>`
      type.

      .. important::

         Choosing the right ``metaField`` for your collection optimizes
         both storage and query performance. For more information on
         ``metaField`` selection and best practices, see :ref:`timeseries-collections-metafield`.

   .. step::

      Define the time interval for each :ref:`bucket <timeseries-bucketing-specifics>` of data.

      You can either use **manual bucketing** by defining a ``granularity``
      field or **interval bucketing** by defining both ``bucketMaxSpanSeconds``
      and ``bucketRoundingSeconds`` fields:

      * Define a ``granularity`` field, as shown above.

        For more detailed information on selecting a ``granularity``
        value, see :ref:`Granularity Considerations <timeseries-granularity-considerations>`.

      **OR**

      * In MongoDB 6.3 and later, you can define ``bucketMaxSpanSeconds`` and 
        ``bucketRoundingSeconds`` fields.

        Both values must be the same. If one is defined, the other must
        be as well:

        .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/Tutorial.snippet.collection-options.cs
           :language: csharp
           :copyable: true
           :category: syntax example

      .. important:: Changing Time Series Intervals

         After creation, you can modify granularity or bucket definitions by
         using the C# Driver ``RunCommand()`` method to run the 
         :dbcommand:`collMod` database command. However, you can only increase 
         the time span covered by each bucket.

         For more information on running database commands from the C#
         Driver, refer to the :driver:`Run a Database Command </csharp/current/run-command/>` page
         in the Node.js Driver documentation.

         For more information on modifying time series intervals,
         see :ref:`Change Time Series Granularity <change-granularity>`.

   .. step::

      Optionally, set ``ExpireAfter`` to expire documents when the
      value of the ``timeField`` reaches the specified interval. Expired
      documents are automatically deleted:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/CreateAndPopulateTimeSeriesCollection.snippet.set-createCollectionOptions.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step::

      Create the collection in a database using the ``CreateCollection()``
      method.

      The following example creates a database named ``timeseries`` and stores
      a reference to it under ``timeSeriesDB``. It then create a timeseries
      collection named ``weather`` in that database and stores a reference to it
      under the same name:

      .. literalinclude:: /code-examples/tested/csharp/driver/TimeSeries/CreateAndPopulateTimeSeriesCollection.snippet.create-timeseries-collection.cs
         :language: csharp
         :copyable: true
         :category: syntax example
