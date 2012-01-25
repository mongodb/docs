===============================
Run-time Database Configuration
===============================

.. default-domain:: mongodb

The :doc:`command line </reference/mongod>` and :doc:`configuration
file </reference/configuration-options>` interfaces provide MongoDB
administrators with a large number of options and settings for
controlling the operation of the database system. This document
provides an overview of common configurations and examples of
best-practice configurations for common use cases.

While both interfaces provide access the same collection of options
and settings, this document primarily uses the configuration file
interface. If you run MongoDB using a control script or packaged for
your operating system, you likely already have a configuration file
located at ``/etc/mogondb.conf``. Confirm this by checking the content
of the ``/etc/init.d/mongodb`` or ``/etc/rc.d/mongodb`` script to
insure that the :term:`control scripts <control script>` starts the
:program:`mongod` with the appropriate configuration file (see below.)

To start MongoDB instance using this configuration issue a command in
the following form: ::

     mongod --config /etc/mongodb.conf
     mongod -f /etc/mongodb.conf

Modify the values in the ``/etc/mongodb.conf`` file on your system to
control the configuration of your database instance.

.. _base-config:

Starting, Stopping, and Running the Database
--------------------------------------------

Consider the following basic configuration:

.. code-block:: cfg

   fork = true
   bind_ip = 127.0.0.1
   port = 27017
   quiet = true
   dbpath = /srv/mongodb
   logpath = /var/log/mongodb/mongod.log
   logappend = true
   journal = true

For most standalone servers, this is a sufficient base
configuration. It makes several assumptions, but consider the
following explanation:

- :setting:`fork`" is ``true``, which enables a
  :term:`daemon` mode for :program:`mongod`, which detaches (i.e. "forks")
  the MongoDB from the current session and allows you to run the
  database as a conventional server.

- :setting:`bind_ip` is ``127.0.0.1``, which forces the
  server to only listen for requests on the localhost IP. Only bind to
  secure interfaces that the application-level systems can access with
  access control provided by system network filtering
  (i.e. ":term:`firewall`) systems.

- :setting:`port` is ``27017``, which is the default
  MongoDB port for database instances. MongoDB can bind to any
  port. You can also filter access based on port using network
  filtering tools.

  .. note:: UNIX-like systems require superuser privileges to attach
     processes to ports lower than 1000.

- :setting:`quiet` is ``true``. This disables all but
  the most critical entries in output/log file. In normal operation
  this is the preferable operation to avoid log noise. In diagnostic
  or testing situations, set this value to ``false``. Use
  :dbcommand:`setParameter` to modify this setting during
  run time.

- :setting:`dbpath` is ``/srv/mongodb``, which
  specifies where MongoDB will store its data files. ``/srv/mongodb``
  and ``/var/lib/mongodb`` are popular locations. The user account
  that :program:`mongod` runs under will need read and write access to this
  directory.

- :setting:`logpath` is ``/var/log/mongodb/mongod.log``
  which is where :program:`mongod` will write its output. If you do not set
  this value, :program:`mongod` writes all output to standard output
  (e.g. ``stdout``.)

- :setting:`logappend` is ``true``, which ensures that
  :program:`mongod` does not overwrite an existing log file
  following the server start operation.

- :setting:`journal` is ``true``, which enables
  :doc:`journaling </core/journaling>` which ensures single instance
  write-durability. 64-bit builds of :program:`mongod` enable
  :term:`journaling` by default. Thus, this setting may be redundant.

Given the default configuration, some of these values may be
redundant. However, in many situations explicitly stating the
configuration increases overall system intelligibility.

Security Considerations
-----------------------

The following collection of configuration options are useful for
limiting access to a :program:`mongod` instance. Consider the
following:

.. code-block:: cfg

   bind_ip = 127.0.0.1
   bind_ip = 10.8.0.10
   bind_ip = 192.168.4.24
   nounixsocket = true
   auth = true

Consider the following explanation for these configuration decisions:

- ":setting:`bind_ip`" has three values: ``127.0.0.1``, the localhost
  interface; ``10.8.0.10``, a private IP address typically used for
  local networks and VPN interfaces; and ``192.168.4.24``, a private
  network interface typically used for local networks.

  Because production MongoDB instances need to be accessible from
  multiple database servers, it is important to bind MongoDB to
  multiple interfaces that are accessible from your application
  servers. At the same time it's important to limit these interfaces
  to interfaces controlled and protected at the network layer.

- ":setting:`nounixsocket`" is  ``true`` which disables the
  UNIX Socket, which is otherwise enabled by default. This limits
  access on the local system. This is desirable when running MongoDB
  on with shared access, but in most situations has minimal impact.

- ":setting:`auth`" is ``true`` which enables the authentication
  system within MongoDB. If enabled you will need to log in, by
  connecting over the ``localhost`` interface for the first time to
  create user credentials.

.. seealso:: ":doc:`/administration/security`"

Replication and Sharding Configuration
--------------------------------------

Replication Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

:term:`Replica set` configuration is very straightforward, and only
requires that the :setting:`replSet` have a value that is consistent
among all members of the staff. Consider the following:

.. code-block:: cfg

   replSet = set0

Use descriptive names for sets. Once configured use the
:program:`mongo` shell to add hosts to the replica set. For a more
typical replica set configuration consider the following:

.. code-block:: cfg

   replSet = set1/peer0.example.net,peer1.example.net:27018,peer3.example.net

Here, the ``replSet`` contains a set name (i.e. "``set1``") followed
by a slash (i.e. "``/``") and a comma separated list of hostnames of
set members, with optional port names. This list of hosts serves as a
"seed," from which this host will derive the replica set
configuration. You may add additional members at anytime to the
configuration using :js:func:`rs.reconfig()` function.

.. seealso:: ":ref:`Replica set reconfiguration
   <replica-set-reconfiguration-usage>`.

To enable authentication for the :term:`replica set`, add the
following option:

.. code-block:: cfg

   auth = true
   keyfile = /srv/mongodb/keyfile

.. versionadded:: 1.8 for replica sets, and 1.9.1 for sharded replica sets.

Setting :setting:`auth` to ``true`` enables authentication,
while :setting:`keyFile` specifies a key file for the replica
set member use to when authenticating to each other. The content is
arbitrary and must be under one kilobyte and contain characters in the
base64 set, and the file must not have group or "world" permissions on
UNIX systems. Use the following command to use the OpenSSL package to
generate a "random" key file:

.. code-block:: bash

   openssl rand -base64 753

.. note:: Keyfile permissions are not checked on Windows systems.

.. seealso:: The ":doc:`/replication`" index and the
   ":doc:`/core/replication`" document for more information on
   replication and replica set configuration.

Sharding Configuration
~~~~~~~~~~~~~~~~~~~~~~

Sharding requires a number of :program:`mongod` instances with
different configurations. The config servers stores the cluster's
metadata, while the cluster distributes data among one or more
shard servers.

To set up one or three "config server" instances as :ref:`normal
<base-config>` :program:`mongod` instances, and then add the following
configuration option:

.. code-block:: cfg

   configsrv = true

   bind_ip = 10.8.0.12
   port = 27001

This creates a config server running on the private IP address
``10.8.0.12`` on port ``27001``. Make sure that there are no port
conflicts, and that your config server is accessible from all of your
":program:`mongos`" and ":program:`mongod`" instances.

To set up shards, configure two or more :program:`mongod` instance
using your :ref:`base configuration <base-config>`, adding the
:setting:`shardsvr` setting:

.. code-block:: cfg

   shardsvr = true

Finally, to establish the cluster, configure at least one
:program:`mongos` process with the following settings:

.. code-block:: cfg

   configdb = 10.8.0.12:27001
   chunkSize = 64

You can specify multiple :setting:`configdb` instances by
specifying hostnames and ports in the form of a comma separated
list. In general, avoid modifying the :setting:`chunkSize` from
the default value of 64, [#chunksize]_ and *should* ensure this setting is consistent
among all :program:`mongos` instances.

.. [#chunksize] :term:`Chunk` size is 64 megabytes by default, which
   provides the ideal balance between the most even distribution of
   data, for which smaller chunk sizes are best, and minimizing chunk
   migration, for which larger chunk sizes are optimal.

.. seealso:: ":doc:`/core/sharding`" for more information on sharding
   and shard cluster configuration.

Running Multiple Database Instances on the Same System
------------------------------------------------------

In many cases running multiple instances of :program:`mongod` on a
single system is not recommended, on some types of deployments
[#multimongod]_ and for testing purposes you may need to run more than
one :program:`mongod` on a single system.

In these cases, use a :ref:`base configuration <base-config>` for each
instance, but consider the following configuration values:

.. code-block:: cfg

   dbpath = /srv/mongodb/db0/
   pidfileath = /srv/mongodb/db0.pid

The :setting:`dbpath` value controls the location of the
:program:`mongod` instance's data directory. Ensure that each database
has a distinct and well labeled data directory. The
:setting:`pidfilepath` controls where :program:`mongod` process
places it's :term:`pid` file. As this tracks the specific
:program:`mongod` file, it is crucial that file be unique and well
labeled to make it easy to start and stop these processes.

Create additional :term:`control scripts <control script>` and/or
adjust your existing MongoDB configuration and control script as
needed to control these processes.

.. [#multimongod] Single-tenant systems with :term:`SSD` or other high
   performance disks may provide acceptable performance levels for
   multiple :program:`mongod` instances. Additionally, you may find that
   multiple databases with small working sets may function acceptably
   on a single system.

Diagnostic Configurations
-------------------------

The following configuration options control various :program:`mongod`
behaviors for diagnostic purposes. The following settings have default
values that tuned for general production purposes:

.. code-block:: cfg

   slowms = 50
   profile = 3
   verbose = true
   diaglog = 3
   objcheck = true
   cpu = true

Use the :ref:`base configuration <base-config>` and add these options
if you are experiencing some unknown issue or performance problem as
needed:

- :setting:`slowms` configures the threshold for the :term:`database
  profiler` to consider a query "slow." The default value is 100
  milliseconds. Set a lower value if the database profiler does not
  return useful results. See the ":doc:`/applications/optimization`"
  for more information on optimizing operations in MongoDB.

- :setting:`profile` sets the :term:`database profiler`
  level. The profiler is not active by default because of the possible
  impact on the profiler itself on performance. Unless this setting
  has a value, queries are not profiled.

- :setting:`verbose` enables a verbose logging mode that
  modifies :program:`mongod` output and increases logging to include a
  greater number of events. Only use this option if you are
  experiencing an issue that is not reflected in the normal logging
  level. If you require additional verbosity, consider the following
  options:

  .. code-block:: cfg

     v = true
     vv = true
     vvv = true
     vvvv = true
     vvvvv = true

  Each additional level ``v`` adds additional verbosity to the
  logging. The "``verbose``" option  is equal to "``v = true``".

- :setting:`diaglog` enables diagnostic logging. Level ``3``
  logs all read and write options.

- :setting:`objcheck` forces :program:`mongod` to validate all
  requests from clients upon receipt. Use this option to ensure that
  invalid requests are not causing errors, particularly when running a
  database with untrusted clients. This option may affect database
  performance.

- :setting:`cpu` forces :program:`mongod` to periodically report CPU
   utilization I/O wait in the logfile. Use this in combination with or
   addition to tools such as :program:`iostat`, :program:`vmstat`, or
   :program:`top` to provide insight into the state of the system
   in context of the log.
