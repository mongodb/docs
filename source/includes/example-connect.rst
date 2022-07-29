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

.. code-block:: shell

   mongodb://<user>:<password>@<ip-address>:<port>,<ip-address>:<port>,<ip-address>:<port>

Use the connection information you gathered to create the connection
strings for ``cluster0`` and ``cluster1``:

.. code-block:: shell

   cluster0:
   mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020
   cluster1:
   mongodb://clusterAdmin:superSecret@clusterTwo01.fancyCorp.com:20020,clusterTwo02.fancyCorp.com:20020,clusterTwo03.fancyCorp.com:20020

The ``mongosync`` command layout below is modified for display. To
connect ``cluster0`` to ``cluster1`` with ``mongosync``, enter the
following command on one line:

.. code-block:: shell

   mongosync --cluster0 mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,
                       clusterOne02.fancyCorp.com:20020,
                       clusterOne03.fancyCorp.com:20020
             --cluster1 mongodb://clusterAdmin:superSecret@clusterTwo01.fancyCorp.com:20020,
                       clusterTwo02.fancyCorp.com:20020,
                       clusterTwo03.fancyCorp.com:20020

