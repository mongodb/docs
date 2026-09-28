You must first configure the settings for your time series collection:

Configure a Time Series Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step:: Create and Configure a ``timeseries`` dictionary

      .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.set-ts-options.py
         :language: python
         :copyable: true
         :category: syntax example

      A. Define the ``timeField`` and ``metaField``.

         The ``timefield`` contains the time data and the ``metaField`` contains
         the metadata.

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
         field or **interval bucketing** by defining both the ``bucketMaxSpanSeconds``
         and ``bucketRoundingSeconds`` fields:

         * Define a ``granularity`` field, as shown above.

           For more detailed information on selecting a ``granularity``
           value, see :ref:`Granularity Considerations <timeseries-granularity-considerations>`.

         **OR**

         * As an alternative to ``granularity``, you can define the
           ``bucketMaxSpanSeconds`` and ``bucketRoundingSeconds`` fields.

           Both values must be the same, and you must specify the unit of time
           you are using. If one is defined, the other must be as well:

           .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.set-ts-options-bucket-settings.py
              :language: python
              :copyable: true
              :category: syntax example

         .. important:: Changing Time Series Intervals

            After creation, you can modify granularity or bucket definitions by
            using the PyMongo Driver ``command()`` method to run the
            :dbcommand:`collMod` database command. However, you can only
            increase the time span covered by each bucket.

            For more information on running database commands from the Java
            Driver, refer to the :languages:`Run a Database Command </python/pymongo-driver/current/run-command/>`
            page in the PyMongo Driver documentation.

         For more information on modifying time series intervals,
         see :ref:`Change Time Series Granularity <change-granularity>`.

   .. step:: Create the collection

      You then create your collection with the configured settings using
      the ``db.create_collection()`` method.

      The following example uses a database named ``timeseries`` and stores
      a reference to it under ``timeseries_db``. It then create a timeseries
      collection named ``weather`` in that database:

      .. literalinclude:: /code-examples/tested/python/pymongo/timeseries/ts_create_and_query.snippet.create-coll.py
         :language: python
         :copyable: true
         :category: syntax example

      Optionally, set ``expireAfterSeconds`` to expire documents when the
      value of the ``timeField`` reaches the specified interval. Expired
      documents are automatically deleted.
