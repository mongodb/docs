===========================
Expand Existing Replica Set
===========================

.. default-domain:: mongodb

Overview
--------

From time to time it may be necessary to add an additional node to an
existing replica set to increase capacity for distributed reads, or to
add geographical distribution to an existing replica set. Consider the
":doc:`/administration/replication-architectures`" documentation for
more background on replication deployment patterns.

This tutorial outlines the process for adding members to an existing
replica set.

Requirements
------------

1. An active replica set. Hereafter refereed to as ``rs0``

2. A system capable of supporting your database, with MongoDB
   installed. This system needs to be accessible by way of a
   resolvable DNS or hostname as: "``mongodb3.example.net``".

If either of these conditions are not supplied, consider the following
tutorials which address these processes:

- :doc:`/tutorial/deploy-replica-set`

- :doc:`/tutorial/install-mongodb-in-production-environments`

- :doc:`/tutorial/install-mongodb-for-testing-and-development`

Procedure
---------

On the new system, ensure that a configuration file that resembles the
following is located on the file system at ``/etc/mongodb.conf``.

.. code-block:: cfg

   port = 27017

   bind_ip = 10.8.0.10

   dbpath = /srv/mongodb/

   fork = true

   replSet = rs0/mongodb0.example.net,mongodb1.example.net,mongodb2.example.net,mongodb3.example.net

Modify the :setting:`bind_ip` to reflect a secure interface on
your system that will be able to access all other members of the set
*and* on which all other members of the replica set can access the
current node. The DNS or host names need to resolve to this IP address
on the other members of the set. Configure network rules or a virtual
private network (i.e. "VPN") to permit this access.

.. note::

   The portion of the :setting:`replSet` following the ``/``
   provides a "seed list" of hosts that are known to be members of the
   same replica set, which is used for fetching changed configurations
   following restarts. It is acceptable to omit this section entirely,
   and have the :setting:`replSet` option resemble:

   .. code-block:: cfg

      replSet = rs0

See the documentation of the configuration options used above:
:setting:`dbpath`, :setting:`port`,
:setting:`replSet`, :setting:`bind_ip`, and
:setting:`fork`. Also consider any additional
:doc:`configuration options </reference/configuration-options>` that
your deployment may require.

Start the :program:`mongod` process with the following command: ::

     mongod --config /etc/mongodb.conf

.. note::

   In production deployments you likely want to use and configure a
   :term:`control script` to manage this process based on this
   command. Control scripts are beyond the scope of this document.

Log into one of the existing members of the current replica set by
issuing the following command: ::

     mongo mongodb0.example.net

If this instance is not currently the :term:`primary` node, use the
:func:`db.isMaster()` function to determine which node is in the
:data:`isMaster.primary` field. Issue the following command: ::

.. code-block:: javascript

   db.isMaster()

Log into the current :term:`primary` using the :program:`mongo` shell
and issue the following command to add the new set member to the
replica set.

.. code-block:: javascript

   rs.add("mongodb3.example.net")

Congratulations! You have successfully expanded an existing replica
set. You can use the :func:`rs.status()` function to provide an
overview of :doc:`replica set status </reference/replica-status>`, or
the :func:`rs.conf()` for the complete :doc:`replica set
configuration </reference/replica-configuration>`.
