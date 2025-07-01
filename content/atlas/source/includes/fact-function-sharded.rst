If you have a function that connects to a sharded cluster 
with many shards, you might experience performance issues. For 
example, with a ten shard |service| cluster, the driver connects to all
thirty :binary:`bin.mongos` instances by default. You can use the
``srvMaxHosts`` option in your connection string to set the maximum
number of hosts that the driver connects to. To improve driver
performance, set ``srvMaxHosts=3``. For example:

.. code-block::

    mongodb+srv://<db_username>:<db_password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority&srvMaxHosts=3
