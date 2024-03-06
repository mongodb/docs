:ref:`mongosync <c2c-mongosync>` uses a :ref:`MongoDB URI
connection string <mongodb-uri>` to connect Atlas clusters:

- The SRV connection scheme has the form:

  .. code-block:: none

     mongodb+srv://[username:password]@[clusterName].[host].mongodb.net/

  For information on how to find your SRV connection
  string in Atlas, see :atlas:`Connect to Your Cluster 
  </tutorial/connect-to-your-cluster>`.

- The standard URI connection scheme has the form:

  .. code-block:: none
  
     mongodb://[username:password]@[clusterName].[host].mongodb.net/

.. include:: /includes/read-preference-connection-string.rst
   