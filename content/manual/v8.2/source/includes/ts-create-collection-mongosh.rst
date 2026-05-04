Create your collection with your desired time series settings using 
the :method:`db.createCollection()` method.
      
The following example creates a collection named ``weather``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/create-query/create-collection.snippet.create-collection.js
   :language: javascript
   :copyable: true
   :category: syntax example

For more information on running database commands see 
the :mongosh:`Run Commands </run-commands>` page.

The steps below outline how to effectively configure a time series collection's
settings.

Configure a Time Series Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step::

      Define the ``timeField`` as the field that contains time data and 
      the ``metaField`` as the field that contains metadata.
      
      In the example above, ``time`` is the name of the ``timeField`` 
      and ``sensor`` is the name of the ``metaField``. The value of the 
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

      * In MongoDB 6.3 and later, you can define ``bucketMaxSpanSeconds`` and ``bucketRoundingSeconds`` fields. 

        Both values must be the same. If one is defined, the other must 
        be as well:

        .. literalinclude:: /code-examples/tested/command-line/mongosh/timeseries/create-query/create-collection-bucket.snippet.create-collection-bucket.js
           :language: javascript
           :copyable: true
           :category: syntax example

      .. important:: Changing Time Series Intervals

         After creation, you can modify granularity or bucket definitions by
         using the :dbcommand:`collMod` database command. However, you can 
         only increase the time span covered by each bucket.

         For more information on modifying time series intervals,
         see :ref:`Change Time Series Granularity <change-granularity>`.

   .. step::

      Optionally, set ``expireAfterSeconds`` to expire documents when the 
      value of the ``timeField`` reaches the specified interval. Expired 
      documents are automatically deleted.
