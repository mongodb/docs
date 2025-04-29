``mongosync`` uses a :ref:`MongoDB URI
connection string <mongodb-uri>` to connect self-managed clusters:

- The SRV connection scheme has the form:

  .. code-block:: none

     mongodb+srv://[username:password@][host.domain.TLD][/defaultauthdb][?options]

- The standard URI connection scheme has the form:

  .. code-block:: none
  
     mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

Specify the hostnames of the :program:`mongod` instances the same way
that they are listed in your replica set configuration.

For :ref:`sharded clusters <sharding-sharded-cluster>`, specify the
hostnames of the :program:`mongos` instances instead of the
:program:`mongod` instances.

.. note::

   ``mongosync`` does not require the :urioption:`replicaSet` option.

.. include:: /includes/read-preference-connection-string.rst