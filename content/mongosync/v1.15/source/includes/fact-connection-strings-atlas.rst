``mongosync`` uses a :ref:`MongoDB URI
connection string <mongodb-uri>` to connect Atlas clusters:

- The SRV connection scheme has the form:

  .. literalinclude:: /code-examples/includes/fact-connection-strings-atlas/1.txt
     :language: text

  For information on how to find your SRV connection
  string in Atlas, see :atlas:`Connect to Your Cluster 
  </tutorial/connect-to-your-cluster>`.

- The standard URI connection scheme has the form:

  .. literalinclude:: /code-examples/includes/fact-connection-strings-atlas/2.txt
     :language: text

.. include:: /includes/read-preference-connection-string.rst
   