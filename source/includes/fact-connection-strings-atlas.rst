``mongosync`` uses a :ref:`MongoDB URI
connection string <mongodb-uri>` to connect Atlas clusters:

- The SRV connection scheme has the form:

  .. code-block:: none

     mongodb+srv://[username:password@][host.domain.TLD][:port][/defaultauthdb][?options]

  For information on how to find your SRV connection
  string in Atlas, see :atlas:`Connect to Your Cluster 
  </tutorial/connect-to-your-cluster>`.

- The standard URI connection scheme has the form:

  .. code-block:: none
  
     mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

Specify the hostnames of the :binary:`mongod` instances the same way
that they are listed in your replica set configuration.

For :ref:`sharded clusters <sharding-sharded-cluster>`, specify the
hostnames of the :binary:`mongos` instances instead of the
:binary:`mongod` instances.

.. note::

   ``mongosync`` does not require the :urioption:`replicaSet` option.

.. include:: /includes/read-preference-connection-string.rst