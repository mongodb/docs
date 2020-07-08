The ``kerberos`` object is optional and defines a kerberos service name used in authentication.

.. code-block:: cfg

   "kerberos": {
       "serviceName": <string>
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``kerberos``
     - object
     - *Optional*. A key-value pair that defines the kerberos service name
       agents use to authenticate via kerberos.

   * - | ``kerberos``
       | ``.serviceName``
     - string
     - The service name agents use to authenticate to a :program:`mongod`
       or :program:`mongos` via kerberos. This name is also used to set
       the ``saslServiceName`` option in a MongoDB configuration, as
       described on the :manual:`MongoDB Server Parameters
       </reference/parameters/>` page in the MongoDB manual.
