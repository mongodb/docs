===============================================
Deploy a Geographically Distributed Replica Set
===============================================

.. default-domain:: mongodb

This document describes the procedure for deploying a replica set with
members in multiple locations, and addresses both three member replica
sets, four member replica sets, and replica sets with more than four
members.

.. seealso:: ":doc:`/core/replication`" and
   ":doc:`/administration/replication-architectures`" for appropriate
   background.

   The ":doc:`/tutorial/deploy-replica-set`" and
   ":doc:`/tutorial/expand-replica-set`" tutorials provide
   documentation of related operations.

Overview
--------

While replica sets provide basic protection against single-instance
failure, when all of the members of a replica set reside within a
single facility, the replica set is still susceptible to some classes
of errors within that facility including power outages, networking
distortions, and natural disasters. To protect against these classes
of failures, deploy a replica set with one or more members in a
geographically distinct facility or data center.

Requirements
------------

For a three-member replica set you will need two instances in a
primary facility (hereafter, "Site A") and one member in a secondary
facility (hereafter, "Site B".) Site A should be the same facility or
very close to your primary application infrastructure
(i.e. application servers, caching layer, users, etc.)

For a four-member replica set you will need two systems within Site A,
two members in Site B (or one member in Site B, and one member in Site
C,) and a single :term:`arbiter` in Site A.

If you wish to deploy additional members in the secondary facility or
multiple secondary facilities, the requirements are the same with the
following notes:

- Ensure that a majority of the total number of :ref:`voting nodes
  <replica-set-non-voting-members>` are within Site A. This includes
  :ref:`secondary-only members <replica-set-secondary-only-members>` and
  :ref:`arbiters <replica-set-arbiters>`.

- If you deploy a replica set with an uneven number of members, deploy
  an :ref:`arbiter <replica-set-arbiters>` within Site A.

Procedure
---------
// TODO : Can you please rewrite this sentence. Its clear what you are trying to say
but when read as a whole line, i feel as if it doesn't flow as a sentence.

Although its possible to deploy multiple members on a single system,
it reduces the redundancy and capacity of the system, these kinds of
deployments are typically for testing purposes and beyond the scope of
this tutorial.

Three Member Replica Set
~~~~~~~~~~~~~~~~~~~~~~~~

Consider the following features of this deployment:

- Each member of the replica set, except for the :term:`arbiter` (see
  below), will reside on it's own machine, and the MongoDB processes
  will all bind to port ``27017``, or the standard MongoDB port.

- :doc:`Configuration files </reference/configuration-options>`
  provide runtime configuration rather than as :doc:`command line
  options </reference/mongod>`.

- Each member of the replica set needs to be accessible by way of
  resolvable DNS or hostnames in the following scheme:

  - ``mongodb0.example.net``
  - ``mongodb1.example.net``
  - ``mongodb2.example.net``

  Configure DNS names appropriately, *or* set up your systems'
  ``/etc/host`` file to reflect this configuration. Ensure that one
  system (e.g. ``mongodb2.example.net``) resides in Site B. Host all
  other hosts systems in Site A.

- Ensure that network traffic can pass between all members in the
  network securely and efficiently. Consider the following:

  - Establish a virtual private network between the systems in Site A
    and Site B (and Site C if it exists) to encrypt all traffic
    between the sites and remains private. Ensure that your network
    topology routs all traffic between members within a single site
    over the local area network.

  - Configure authentication using :setting:`auth` and
    :setting:`keyFile`, so that only servers and process with
    authentication can connect to the replica set.

  - Configure networking and firewall rules so that only traffic
    (incoming and outgoing packets) on the default MongoDB port
    (e.g. ``27017``) from *within* your deployment.

    .. seealso:: The ":doc:`/administration/security`" document for
       more information regarding security and firewalls.

Use the following configuration for each MongoDB instance:

.. code-block:: cfg

   port = 27017

   bind_ip = 10.8.0.10

   dbpath = /srv/mongodb/

   fork = true

   replSet = rs0/mongodb0.example.net,mongodb1.example.net,mongodb2.example.net

Modify the :setting:`bind_ip` to reflect a secure interface on your
system that will be able to access all other members of the set *and*
that is accessible to all other members of the replica set. The DNS or
host names need to point and resolve to this IP address. Configure
network rules or a virtual private network (i.e. "VPN") to permit this
access.

.. note::

   The portion of the :setting:`replSet` following the ``/`` provides
   a "seed list" of known members of the replica
   set. :program:`mongod` uses this list to fetch configuration
   changes following restarts. It is acceptable to omit this section
   entirely, and have the :setting:`replSet` option resemble:

   .. code-block:: cfg

      replSet = rs0

Store this file on each system, located at ``/etc/mongodb.conf`` on
the file system. See the documentation of the configuration options
used above: :setting:`dbpath`, :setting:`port`, :setting:`replSet`,
:setting:`bind_ip`, and :setting:`fork`. Also consider any additional
:doc:`configuration options </reference/configuration-options>` that
your deployment requires.

On each system issue the following command to start the
:program:`mongod` process:

.. code-block:: sh

   mongod --config /etc/mongodb.conf

.. note::

   In production deployments you likely want to use and configure a
   :term:`control script` to manage this process based on this
   command. Control scripts are beyond the scope of this document.

Log in with the :program:`mongo` shell to this host using the
:program:`mongo` command at the system prompt. Call the following
shell helper to initiate a replica set consisting of the current
instance, using the default configuration:

.. code-block:: javascript

   rs.initiate()

Use the following shell function to display the current :doc:`replica
configuration </reference/replica-configuration>`:

.. code-block:: javascript

   rs.config()

Now, issue the following sequence of commands to add the remaining
members to the replica set. The following examrsple assumes that the
current primary is ``mongodb0.example.net``.

.. code-block:: javascript

   rs.add("mongodb1.example.net")
   rs.add("mongodb2.example.net")
   rs.add("mongodb3.example.net")

Make sure that you have configured the member located in Site B
(i.e. ``mongodb3.example.net``) as a :ref:`secondary-only member
<replica-set-secondary-only-members>`. First, issue the following
command determine the :data:`members[n]._id` value for
``mongodb3.example.net``:

.. code-block:: javascript

   rs.config()

In the :data:`member array <rs.conf.members>` for this host, save
the :data:`members[n]._id` value. The next example assumes that this
value is ``2``. Next, in the shell connected to the replica set's
:term:`primary`, issue the following command sequence:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[2].priority = 0
   rs.reconfig(cfg)

.. note::

   The :func:`rs.reconfig()` shell command can force the current
   primary to step down and causes an election in some
   situations. When the primary steps down, all clients will
   disconnect. This is the intended behavior. While, this typically
   takes 10-20 seconds, attempt to make these changes during scheduled
   maintenance periods.

Congratulations! You have now deployed a geographically distributed
three-member replica set.

Four Member Replica Set
~~~~~~~~~~~~~~~~~~~~~~~

Consider the following features of this deployment:

- Each member of the replica set, except for the arbiter (see
  below), will reside on it's own machine, and the MongoDB processes
  will all bind to port ``27017``, or the standard MongoDB port.

- :doc:`Configuration files </reference/configuration-options>`
  provide runtime configuration rather than as :doc:`command line
  options </reference/mongod>`.

- Each member of the replica set needs to be accessible by way of
  resolvable DNS or hostnames in the following scheme:

  - ``mongodb0.example.net``
  - ``mongodb1.example.net``
  - ``mongodb2.example.net``
  - ``mongodb3.example.net``

  Configure DNS names appropriately, *or* set up your systems'
  ``/etc/host`` file to reflect this configuration. Ensure that one
  system (e.g. ``mongodb2.example.net``) resides in Site B. Host all
  other hosts systems in Site A.

- One host (e.g. ``mongodb3.example.net``) will be an ":term:`arbiter`"
  and can run on a system that is also used for an application server
  or some other shared purpose.

- There are three possible architectures for this replica set:

  - Two members in Site A, two :ref:`secondary-only members
    <replica-set-secondary-only-members>` in Site B, and an
    :term:`arbiter` in Site A.

  - Three members in Site A and one :ref:`secondary-only member
    <replica-set-secondary-only-members>` in Site B.

  - Two members in Site A, one :ref:`secondary-only member
    <replica-set-secondary-only-members>` in Site B, one
    :ref:`secondary-only member <replica-set-secondary-only-members>` in
    Site C and an :term:`arbiter` in site A.

  In most cases the first architecture is preferable because it is the
  lest complex.

- Ensure that network traffic can pass between all members in the
  network securely and efficiently. Consider the following:

  - Establish a virtual private network between the systems in Site A
    and Site B (and Site C if it exists) to encrypt all traffic
    between the sites and remains private. Ensure that your network
    topology routs all traffic between members within a single site
    over the local area network.

  - Configure authentication using :setting:`auth` and
    :setting:`keyFile`, so that only servers and process with
    authentication can connect to the replica set.

  - Configure networking and firewall rules so that only traffic
    (incoming and outgoing packets) on the default MongoDB port
    (e.g. ``27017``) from *within* your deployment.

    .. seealso:: The ":doc:`/administration/security`" document for
       more information regarding security and firewalls.

Use the following configuration for each MongoDB instance:

.. code-block:: cfg

   port = 27017

   bind_ip = 10.8.0.10

   dbpath = /srv/mongodb/

   fork = true

   replSet = rs0/mongodb0.example.net,mongodb1.example.net,mongodb2.example.net,mongodb3.example.net

Modify the :setting:`bind_ip` to reflect a secure interface on your
system that will be able to access all other members of the set *and*
that is accessible to all other members of the replica set. The DNS or
host names need to point and resolve to this IP address. Configure
network rules or a virtual private network (i.e. "VPN") to permit this
access.

.. note::

   The portion of the :setting:`replSet` following the ``/`` provides
   a "seed list" of known members of the replica
   set. :program:`mongod` uses this list to fetch configuration
   changes following restarts. It is acceptable to omit this section
   entirely, and have the :setting:`replSet` option resemble:

   .. code-block:: cfg

      replSet = rs0

Store this file on each system, located at ``/etc/mongodb.conf`` on
the file system. See the documentation of the configuration options
used above: :setting:`dbpath`, :setting:`port`, :setting:`replSet`,
:setting:`bind_ip`, and :setting:`fork`. Also consider any additional
:doc:`configuration options </reference/configuration-options>` that
your deployment requires.

On each system issue the following command to start the
:program:`mongod` process:

.. code-block:: bash

   mongod --config /etc/mongodb.conf

.. note::

   In production deployments you likely want to use and configure a
   :term:`control script` to manage this process based on this
   command. Control scripts are beyond the scope of this document.

Log in with the :program:`mongo` shell to this host using the
:program:`mongo` command at the system prompt. Call the following
shell helper to initiate a replica set consisting of the current
instance using the default configuration:

.. code-block:: javascript

   rs.initiate()

Use the following shell function to display the current :doc:`replica
configuration </reference/replica-configuration>`:

.. code-block:: javascript

   rs.config()

Now, issue the following sequence of commands to add the remaining
instances to the replica set. The following example assumes that the
current primary is ``mongodb0.example.net``.

.. code-block:: javascript

   rs.add("mongodb1.example.net")
   rs.add("mongodb2.example.net")
   rs.add("mongodb3.example.net")

In the same shell session, issue the following command to add the
arbiter (i.e. "``mongodb4.example.net``"):

.. code-block:: javascript

   rs.addArb("mongodb4.example.net")

Make sure that you have configured the member located in Site B
(i.e. ``mongodb3.example.net``) as a :ref:`secondary-only member
<replica-set-secondary-only-members>`. First, issue the following
command determine the :data:`members[n]._id` value for
``mongodb3.example.net``:

.. code-block:: javascript

   rs.config()

In the :data:`member array <rs.conf.members>` for this host, save
the :data:`members[n]._id` value. The next example assumes that
this value is ``2``. Next, in the shell connected to the replica set's
:term:`primary`, issue the following command sequence:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[2].priority = 0
   rs.reconfig(cfg)

.. note::

   The :func:`rs.reconfig()` shell command can force the current
   primary to step down and causes an election in some
   situations. When the primary steps down, all clients will
   disconnect. This is the intended behavior. While, this typically
   takes 10-20 seconds, attempt to make these changes during scheduled
   maintenance periods.

Congratulations! You have now deployed a geographically distributed
four-member replica set.

Larger Replica Set Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The procedure for deploying a geographically distributed set with more
than three or four members resembles the above procedures. However, consider
the following:

- Never deploy more than seven voting members.

- Use the procedure for a four member replica set if you have an even
  number of members. Ensure that Site A always has a majority of
  the members by deploying the :term:`arbiter` within Site A.

  For six member sets, deploy at least three voting members in
  addition to the arbiter in Site A, the remaining rembmers in
  alternate sites.

- Use the procedure for a three member replica set if you have an odd
  number of members. Ensure that Site A always has a majority of the
  members of the set. For example, if a set has five members, deploy
  three remember within the primary facility and two remember in other
  facilities.

- If you have a majority of the members of the set *outside* of Site A
  and the network partitions to prevent communication between sites,
  the current primary in Site A will step down, even if none of the
  members outside of Site A are eligible to become primary.
