Gather Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The source cluster, :setting:`cluster0`, is hosted on the following
servers and ports:

- ``clusterOne01.fancyCorp.com:20020``
- ``clusterOne02.fancyCorp.com:20020``
- ``clusterOne03.fancyCorp.com:20020``

The destination Atlas cluster, :setting:`cluster1`, is hosted on the
following servers and ports:

- ``cluster2Name-01.abc123.com:27017``
- ``cluster2Name-02.abc123.com:27017``
- ``cluster2Name-03.abc123.com:27017``

There is an administrative user, ``clusterAdmin`` configured on each
cluster with password, ``superSecret``.

Connect the Source and Destination Clusters with ``mongosync``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The generic connection string format for the self-managed cluster is: 

.. code-block:: shell

   mongodb://<user>:<password>@<ip-address>:<port>,<ip-address>:<port>,<ip-address>:<port>

The generic connection string format for the Atlas cluster is: 

.. code-block:: shell

   mongodb://<user>:<password>@<clusterName>.<hostname>.mongodb.net/

Use the connection information you gathered for the self-managed cluster
to create the connection strings for ``cluster0``:

.. code-block:: text

   cluster0:
   mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020

You can get the connection string for the Atlas cluster from the Atlas
UI. To learn more, see :atlas:`Connect to a Database Deployment
</connect-to-database-deployment/>`. 

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. code-block:: shell

   mongosync \
         --cluster0 "mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020" \
         --cluster1 "mongodb://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net"

Atlas clusters require TLS connections. To use ``mongosync`` with Atlas
clusters, you add the :urioption:`tls=true <tls>` option. For example,
to connect to the ``admin`` database on ``cluster0`` and ``cluster1``:

.. code-block:: shell

   mongosync \
      --cluster0 "mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020/admin?tls=true" \
      --cluster1 "mongodb://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net/admin?tls=true"

You can also use ``mongodb+srv`` connection strings with ``mongosync``.
You do not need to add the :urioption:`tls=true <tls>` option to a
``mongodb+srv`` connection string. For example:

.. code-block:: shell

   mongosync \
      --cluster0 "mongodb+srv://clusterAdmin:superSecret@clusterOne01.fancyCorp.com/" \
      --cluster1 "mongodb+srv://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net/"

For more details about ``mongodb+srv`` connection strings, see
:ref:`connections-dns-seedlist`.
