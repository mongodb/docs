Gather Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The generic connection string format is: 

.. literalinclude:: /code-examples/includes/example-connect-atlas-to-atlas/1.sh
   :language: shell

You can get the connection string for the Atlas clusters from the Atlas
UI. To learn more, see :atlas:`Connect to a Database Deployment
</connect-to-database-deployment/>`. 

The connection strings you gathered for ``cluster0`` and ``cluster1``
should resemble the following:

.. literalinclude:: /code-examples/includes/example-connect-atlas-to-atlas/2.sh
   :language: shell

There is an database administrative user ``clusterAdmin`` with the
password ``superSecret`` in the project that contains the clusters. 

Connect the Source and Destination Clusters with ``mongosync``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. literalinclude:: /code-examples/includes/example-connect-atlas-to-atlas/3.sh
   :language: shell

Atlas clusters require TLS connections. To use ``mongosync`` with Atlas
clusters, you add the :urioption:`tls=true <tls>` option. For example,
to connect to the ``admin`` database on ``cluster0`` and ``cluster1``:

.. literalinclude:: /code-examples/includes/example-connect-atlas-to-atlas/4.sh
   :language: shell

You can also use ``mongodb+srv`` connection strings with ``mongosync``.
You do not need to add the :urioption:`tls=true <tls>` option to a
``mongodb+srv`` connection string. For example:

.. literalinclude:: /code-examples/includes/example-connect-atlas-to-atlas/5.sh
   :language: shell

For more details about ``mongodb+srv`` connection strings, see
:ref:`connections-dns-seedlist`.
