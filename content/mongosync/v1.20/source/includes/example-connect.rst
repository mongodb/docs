Gather Connection Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The source cluster, ``cluster0``, is hosted on the following servers
and ports:

- clusterOne01.fancyCorp.com:20020
- clusterOne02.fancyCorp.com:20020
- clusterOne03.fancyCorp.com:20020

The destination cluster, ``cluster1``, is hosted on the following
servers and ports:

- clusterTwo01.fancyCorp.com:20020
- clusterTwo02.fancyCorp.com:20020
- clusterTwo03.fancyCorp.com:20020

There is an administrative user, ``clusterAdmin`` configured on each
cluster with password, ``superSecret``.

Connect the Source and Destination Clusters with ``mongosync``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The generic connection string format is: 

.. literalinclude:: /code-examples/includes/example-connect/1.sh
   :language: shell

Use the connection information you gathered to create the connection
strings for ``cluster0`` and ``cluster1``:

.. literalinclude:: /code-examples/includes/example-connect/2.sh
   :language: shell

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. literalinclude:: /code-examples/includes/example-connect/3.sh
   :language: shell

You can also use ``mongodb+srv`` connection strings with ``mongosync``.
You do not need to add the :urioption:`tls=true <tls>` option to a
``mongodb+srv`` connection string. For example:

.. literalinclude:: /code-examples/includes/example-connect/4.sh
   :language: shell

For more details about ``mongodb+srv`` connection strings, see
:ref:`connections-dns-seedlist`.
