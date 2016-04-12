The ``indexConfigs`` array is optional and defines indexes to be built for specific replica sets.

.. code-block:: cfg

   "indexConfigs" : [
       {
           "key" : [ 
               [ <string> : <val> ],
               ...
           ],
           "rsName" : <string>,
           "dbName" : <string>,
           "collectionName" : <string>
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``indexConfigs``
     - array of objects
     - *Optional*. Objects that define specific indexes to be built for
       specific replica sets.

   * - ``indexConfigs.key``
     - array of arrays
     - The index's keys. This "array of arrays" contains a single array if
       the index has just one key.

   * - ``indexConfigs.rsName``
     - string
     - The replica set that the index is build on.

   * - ``indexConfigs.dbName``
     - string
     - The database the index applies to.

   * - ``indexConfigs.collectionName``
     - string
     - The collection the index applies to.
