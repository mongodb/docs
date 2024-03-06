Gather Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The generic connection string format is: 

.. code-block:: shell

   mongodb://<user>:<password>@<clusterName>.<hostname>.mongodb.net/

You can get the connection string for the Atlas clusters from the Atlas
UI. To learn more, see :atlas:`Connect to a Database Deployment
</connect-to-database-deployment/>`. 

The connection strings you gathered for ``cluster0`` and ``cluster1``
should resemble the following:

.. code-block:: shell

   cluster0:
   mongodb+srv://clusterAdmin:superSecret@cluster1Name.abc123.mongodb.net
   cluster1:
   mongodb+srv://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net

There is an database administrative user ``clusterAdmin`` with the
password ``superSecret`` in the project that contains the clusters. 

Connect the Source and Destination Clusters with ``mongosync``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. code-block:: shell

   mongosync \
         --cluster0 "mongodb+srv://clusterAdmin:superSecret@cluster1Name.abc123.mongodb.net" \
         --cluster1 "mongodb+srv://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net"

Atlas clusters require TLS connections. To use ``mongosync`` with Atlas
clusters, you add the :urioption:`tls=true <tls>` option. For example,
to connect to the ``admin`` database on ``cluster0`` and ``cluster1``:

.. code-block:: shell

   mongosync \
      --cluster0 "mongodb+srv://clusterAdmin:superSecret@cluster1Name.abc123.mongodb.net/admin?tls=true" \
      --cluster1 "mongodb+srv://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net/admin?tls=true"

You can also use ``mongodb+srv`` connection strings with ``mongosync``.
You do not need to add the :urioption:`tls=true <tls>` option to a
``mongodb+srv`` connection string. For example:

.. code-block:: shell

   mongosync \
      --cluster0 "mongodb+srv://clusterAdmin:superSecret@cluster1Name.abc123.mongodb.net/" \
      --cluster1 "mongodb+srv://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net/"

For more details about ``mongodb+srv`` connection strings, see
:ref:`connections-dns-seedlist`.
