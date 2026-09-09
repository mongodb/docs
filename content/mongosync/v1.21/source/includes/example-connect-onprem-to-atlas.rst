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

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/1.sh
   :language: shell

The generic connection string format for the Atlas cluster is: 

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/2.sh
   :language: shell

Use the connection information you gathered for the self-managed cluster
to create the connection strings for ``cluster0``:

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/3.txt
   :language: text

You can get the connection string for the Atlas cluster from the Atlas
UI. To learn more, see :atlas:`Connect to a Database Deployment
</connect-to-database-deployment/>`. 

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/4.sh
   :language: shell

Atlas clusters require TLS connections. To use ``mongosync`` with Atlas
clusters, you add the :urioption:`tls=true <tls>` option. For example,
to connect to the ``admin`` database on ``cluster0`` and ``cluster1``:

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/5.sh
   :language: shell

You can also use ``mongodb+srv`` connection strings with ``mongosync``.
You do not need to add the :urioption:`tls=true <tls>` option to a
``mongodb+srv`` connection string. For example:

.. literalinclude:: /code-examples/includes/example-connect-onprem-to-atlas/6.sh
   :language: shell

For more details about ``mongodb+srv`` connection strings, see
:ref:`connections-dns-seedlist`.
