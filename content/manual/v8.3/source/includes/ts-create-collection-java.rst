You must first configure the settings for your time series collection:

Configure a Time Series Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step:: Create and Configure a ``TimeSeriesOptions`` object

      .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.time-series-options-granularity.java
         :language: java
         :copyable: true
         :category: syntax example
         
      A. Define the ``timeField`` and ``metaField``.


         The ``timefield`` contains the time data and the ``metaField`` contains
         the metadata. The ``TimeSeriesOptions`` object stores the ``timeField``.
         
         In the example above, ``time`` is the name of the ``timeField`` 
         and ``sensor`` is the name of the ``metaField``. The value of the 
         ``timeField`` field must be a :ref:`date <document-bson-type-date>` 
         type. 

         .. important::

            Choosing the right ``metaField`` for your collection optimizes
            both storage and query performance. For more information on
            ``metaField`` selection and best practices, see :ref:`timeseries-collections-metafield`.

      B. Define the time interval for each :ref:`bucket <timeseries-bucketing-specifics>` of data.
		
         You can either use **manual bucketing** by defining a ``granularity`` 
         field or **interval bucketing** by defining both the ``bucketMaxSpan`` 
         and ``bucketRounding`` fields:
            
         * Define a ``granularity`` field, as shown above.

           For more detailed information on selecting a ``granularity``
           value, see :ref:`Granularity Considerations <timeseries-granularity-considerations>`.

         **OR**

         * In MongoDB 6.3 and later, you can define the ``bucketMaxSpan`` and ``bucketRounding`` fields. 

           Both values must be the same, and you must specify the unit of time
           you are using. If one is defined, the other must be as well:

           .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.time-series-options-bucket-settings.java
              :language: java
              :copyable: true
              :category: syntax example

         .. important:: Changing Time Series Intervals

            After creation, you can modify granularity or bucket definitions by
            using the Java Driver ``runCommand()`` method to run the :dbcommand:`collMod` database
            command. However, you can only increase the time span covered by 
            each bucket.
            
            For more information on running database commands from the Java
            Driver, refer to the :driver:`Run a Database Command </java/sync/current/command/>` page 
            in the Java Driver documentation.
            
         For more information on modifying time series intervals,
         see :ref:`Change Time Series Granularity <change-granularity>`.
         
   .. step:: Create and Configure a ``CreateCollectionOptions`` object
         
      .. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.create-collection-options.java
         :language: java
         :copyable: true
         :category: syntax example

      a. Set the ``timeSeriesOptions`` field to the 
         ``TimeSeriesOptions`` object you created in the previous step.
         
      b. Optionally, set ``expireAfter`` to expire documents when the 
         value of the ``timeField`` reaches the specified interval. Expired 
         documents are automatically deleted.

You then create your collection with the configured settings using 
the ``db.createCollection()`` method.

The following example uses a database named ``timeseries`` and stores 
a reference to it under ``timeSeriesDB``. It then create a timeseries collection
named ``weather`` in that database and stores a reference to it under the
same name:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/CreateQuery/CreateQueryCollection.snippet.create-collection.java
	:language: java
	:copyable: true
	:category: syntax example
