The **kerberos** object is optional and defines a kerberos service name used in authentication.

.. code-block:: json

   "kerberos": {
     "serviceName": "<string>"
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - kerberos
     - object
     - Optional
     - Key-value pair that defines the kerberos service name
       agents use to authenticate via kerberos.

   * - kerberos.serviceName
     - string
     - Required
     - Label that sets:

       - The service name that the agents use to authenticate to a
         |mongod| or |mongos| via Kerberos.
       - The **saslServiceName** option in the
         :manual:`MongoDB Server Parameters </reference/parameters/>`.
