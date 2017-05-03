The ``roles`` array is optional and describes user-defined roles.

.. code-block:: cfg

   "roles" : [
       {
           "role" : <string>,
           "db" : <string>,
           "privileges" : [
               {
                   "resource" : { ... },
                   "actions" : [ <string>, ... ]
               },
               ...
           ],
           "roles" : [
               {
                   "role" : <string>,
                   "db" : <string>
               }
           ]

       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``roles``
     - array of objects
     - *Optional*. The ``roles`` array contains objects that
       describe the cluster's user-defined roles. Each object describes
       a different user-defined role. Objects in this array contain the
       same fields as documents in the :manual:` system roles collection
       </reference/system-roles-collection>`, except for the ``_id``
       field, which is not included here.
