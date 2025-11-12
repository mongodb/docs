``mongosync`` uses a :ref:`MongoDB URI
connection string <mongodb-uri>` to connect self-managed clusters:

- The SRV connection scheme has the form:

  .. literalinclude:: /code-examples/includes/fact-connection-strings-onprem/1.txt
     :language: text

- The standard URI connection scheme has the form:

  .. literalinclude:: /code-examples/includes/fact-connection-strings-onprem/2.txt
     :language: text

Specify the hostnames of the :program:`mongod` instances the same way
that they are listed in your replica set configuration.

For :ref:`sharded clusters <sharding-sharded-cluster>`, specify the
hostnames of the :program:`mongos` instances instead of the
:program:`mongod` instances.

.. note::

   ``mongosync`` does not require the :urioption:`replicaSet` option.

.. include:: /includes/read-preference-connection-string.rst