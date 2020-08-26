.. option:: --sampleNamespaces <db.collection>

   .. versionadded:: 2.5
   
   ``--sampleNamespaces`` specifies a database and collection for either
   inclusion or exclusion from the data sampling process which creates
   the schema. It is also possible to specify multiple collections from
   a single databases, or multiple collections from multiple databases.
   See :ref:`examples <sampleNamespaces-example>` below.
   
   If you do not use the ``--sampleNamespaces`` option or the
   :option:`--schema <mongosqld --schema>` option, ``mongosqld`` samples
   data from all available MongoDB databases and collections except the
   ``admin`` and ``local`` databases.
   

