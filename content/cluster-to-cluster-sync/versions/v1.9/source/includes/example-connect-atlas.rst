Gather Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The source cluster, ``cluster0``, is hosted on the following servers
and ports:

- clusterOne-shard-00-00.abc12.mongodb.net:27017
- clusterOne-shard-00-01.abc12.mongodb.net:27017
- clusterOne-shard-00-02.abc12.mongodb.net:27017

The destination cluster, ``cluster1``, is hosted on the following
servers and ports:

- clusterTwo-shard-00-00.abc12.mongodb.net:27017
- clusterTwo-shard-00-01.abc12.mongodb.net:27017
- clusterTwo-shard-00-02.abc12.mongodb.net:27017

There is an administrative user, ``clusterAdmin`` configured on each
cluster with password, ``superSecret``.

Connect the Source and Destination Clusters with ``mongosync``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the connection information you gathered to create the connection
strings for ``cluster0`` and ``cluster1``:

.. code-block:: shell

   cluster0:
   mongodb+srv://clusterAdmin:superSecret@clusterOne.abc12.mongodb.net
   cluster1:
   mongodb+srv://clusterAdmin:superSecret@clusterTwo.abc12.mongodb.net

.. note:: 
    
   Atlas clusters require TLS connections. To use ``mongosync`` with Atlas 
   clusters, add the :urioption:`tls=true <tls>` option or use the 
   ``mongodb+srv`` connection string format. For more details about 
   ``mongodb+srv`` connection strings, see :ref:`connections-dns-seedlist`.


The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. code-block:: shell

   mongosync \
         --cluster0 "mongodb+srv://clusterAdmin:superSecret@clusterOne.abc12.mongodb.net" \
         --cluster1 "mongodb+srv://clusterAdmin:superSecret@clusterTwo.abc12.mongodb.net"
