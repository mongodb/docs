===============================
Run-time Database Configuration
===============================

The :doc:`command line </reference/mongod>` and :doc:`configuration
file </reference/configuration-options>` interfaces provide MongoDB
administrators with a large number of options and settings for
controlling the operation of the database system. This document
provides an overview of common configurations and examples of
best-practice configurations for common use cases.

While both the command line and configuration file provide access to
the same collection of options, this document primarily uses the
configuration file. If you run MongoDB using a control script or
packaged for your operating system, you likely already have a
configuration file located at ``/etc/mogondb.conf``. Confirm this by
checking the content of the ``/etc/init.d/mongodb`` or
``/etc/rc.d/mongodb`` script to insure that the ``mongod`` process is
started with the appropriate configuration file (see below.)

To start MongoDB instance using this configuration issue a command in
the following form: ::

     mongod --config /etc/mongodb.conf
     mongod -f /etc/mongodb.conf

Modify the values in this ``mongodb.conf`` to control the
configuration of your database instance.

.. _base-config:

Starting, Stopping, and Running the Database
--------------------------------------------

Consider the following basic configuration: ::

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
following explanation of this configuration:

- :mongodb:setting:`fork`" Is set to ``true`` to enable a :term:`daemon` mode
  for ``mongod``, which detaches (i.e. "forks") the MongoDB from the
  current session and allows you to run the database as a conventional
  server.

- ":mongodb:setting:`bind_ip`" is set to ``127.0.0.1`` and forces the
  server to only listen for requests on the localhost IP. Ideally, the
  server should only bind to secure interfaces that specific
  application-level systems can access with access control provided by
  system network filtering (i.e. ":term:`firewall`) systems.

- :mongodb:setting:`port` is set to ``27017``, which is the default
  MongoDB port for database instances. MongoDB can bind to any port
  (of course, superuser privileges are required on Unix-like systems
  to bind to ports lower than 1000.) You may filter access based on
  port using network filtering tools.

- :mongodb:setting:`quiet` is set to ``true``. This disables all but
  the most critical entries in output/log file. In normal operation
  this is the preferable operation to avoid log noise. In diagnostic
  or testing situations this value should be set to false. Use
  :mongodb:command:`setParameter` to modify this setting during
  run time.

- :mongodb:setting:`dbpath` is set to ``/srv/mongodb``, which
  specifies where MongoDB will store its data files. ``/srv/mongodb``
  and ``/var/lib/mongodb`` are popular locations. The user account
  that ``mongod`` runs under will need read and write access to this
  directory.

- :mongodb:setting:`logpath` is set to ``/var/log/mongodb/mongod.log``
  which is where ``mongod`` will write its output. Unless this value
  is specified, all data will be written to standard output.

- :mongodb:setting:`logappend` is set to ``true`` so that the
  ``mongod`` process does not overwrite an existing log file following
  the server start operation.

- :mongodb:setting:`journal` is set to ``true`` to enable
  :doc:`journaling </core/journaling>` which ensures single instance
  write-durability. On 64-bit systems, this is enabled by default and
  thus may be a redundant setting.

In some cases these settings may be redundant, given the default
configuration; however, in many situations explicitly stating the
configuration increases overall system intelligibility.

Security Considerations
-----------------------

The following collection of configuration options are useful for
limiting access to a ``mongod`` instance. Consider the following: ::

     bind_ip = 127.0.0.1
     bind_ip = 10.8.0.10
     bind_ip = 192.168.4.24
     nounixsocket = true
     auth = true

Consider the following rational and explanation for these
configuration decisions:

- ":mongodb:setting:`bind_ip`" is set to ``127.0.0.1``, the localhost
  interface, ``10.8.0.10``, a private IP address typically used for
  local networks and VPN interfaces, and ``192.168.4.24``, a private
  network interface typically used for local networks.

  Because production MongoDB instances need to be accessible from
  multiple database servers, it is important to bind MongoDB to
  multiple interfaces that are accessible from your application
  servers. At the same time it's important to limit these interfaces
  to controlled interfaces that are protected at the network layer.

- ":mongodb:setting:`nounixsocket`" is set to ``true`` to disable to
  UNIX Socket, which is otherwise enabled by default. This limits
  access on the local system where. This is desirable when running
  MongoDB on with shared access, but in most situations has minimal
  impact.

- ":mongodb:setting:`auth`" is set to ``true`` to enable the
  authentication system within MongoDB. If enabled you will need to
  login connecting over the ``localhost`` interface to create user
  credentials.

.. seealso:: ":doc:`/administration/security`"

Replication and Sharding Configuration
--------------------------------------

Replication Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

:term:`Replica set` configuration is very straightforward, and only
requires that the :mongodb:setting:`replSet` have a value that is consistent
among all members of the staff. Consider the following: ::

     replSet = set0

Use descriptive names for sets. Once configured use the
:option:`mongo` shell to add hosts to the replica set. For a more
typical replica set configuration consider the following: ::

     replSet = set1/peer0.example.net,peer1.example.net:27018,peer3.example.net

Here, the ``replSet`` contains a set name (i.e. "``set1``") followed
by a slash (i.e. "``/``") and a comma separated list of hostnames of
set members, with optional port names. This list of hosts serves as a
"seed," from which this host will derive the replica set
configuration. Additional nodes can be added to the configuration
using :js:func:`rs.reconfig()` function.

To enable authentication for the replica set, add the following
option: ::

     auth = true
     keyfile = /srv/mongodb/keyfile

.. versionadded:: 1.8 for replica sets, and 1.9.1 for sharded replica sets.

Setting :mongodb:setting:`auth` to ``true`` enables authentication,
while :mongodb:setting:`keyfile` specifies a key file to be used by
the replica set members to authenticate to each other. The content is
arbitrary and must be under one kilobyte and contain characters in the
base64 set, and the file must not have group or "world" permissions on
UNIX systems. Use the following command to use the OpenSSL package to
generate a "random" key file: ::

     openssl rand -base64 753

.. note:: Keyfile permissions are not checked on Windows systems.

.. seealso:: ":doc:`/core/replication`" for more information on
   replication and replica set configuration.

Sharding Configuration
~~~~~~~~~~~~~~~~~~~~~~

Sharding requires a number of nodes with slightly different
configurations. The config servers stores the cluster's metadata,
while the data is distributed among one or more shard servers.

To set up one or three "config server" instances as :ref:`normal
<base-config>` :option:`mongod` nodes, and then add the following
configuration option: ::

     configsrv = true

     bind_ip = 10.8.0.12
     port = 27001

This creates a config server running on the private IP address
``10.8.0.12`` on port ``27001``. Make sure that there are no port
conflicts, and that your config server is accessible from all of your
":option:`mongos`" and ":option:`mongod`" instances.

To set up shards, configure two or more :option:`mongod` nodes
normally, but add the following configuration: ::

     shardsvr = true

Finally, to establish the cluster configure at least one
:option:`mongos` process with the following settings: ::

     configdb = 10.8.0.12:27001
     chunkSize = 64

You can specify multiple :mongodb:setting:`configdb` instances by
specifying a comma separated list. In general you should not modify
the :mongodb:setting:`chunkSize` from its default of 64, and *should*
ensure this setting is consistent among all :option:`mongos`
instances.

.. seealso:: ":doc:`/core/sharding`" for more information on sharding
   and shard cluster configuration.

Running Multiple Database Instances on the Same System
------------------------------------------------------

In many cases running multiple instances of :option:`mongod` on a
single system is not recommended, on some types of deployments
[#multimongod]_ and for testing purposes you may need to run more than
one :option:`mongod` on a single system.

In these cases, use a :ref:`base configuration <base-config>` for each
node, but consider the following configuration values: ::

     dbpath = /srv/mongodb/db0/
     pidpath = /srv/mongodb/db0.pid

The :mongodb:setting:`dbpath` value controls the location of the
:option:`mongod` instance's data directory. Ensure that each database
has a distinct and well labeled data directory. The
:mongodb:setting:`pidpath` controls where :option:`mongod` process
places it's :term:`pid` file. As this tracks the specific
:option:`mongod` file, it is crucial that file be unique and well
labeled to make it easy to start and stop these processes.

Create additional :term:`control scripts <control script>` and/or
adjust your existing MongoDB configuration and control script as
needed to control these processes.

.. [#multimongod] Single-tenant systems with :term:`SSD` or other high
   performance disks may provide acceptable performance levels for
   multiple ``mongod`` instances. Additionally, you may find that
   multiple databases with small working sets may function acceptably
   on a single system.

Diagnostics Configurations
--------------------------

The following configuration options control various :option:`mongod`
behaviors for diagnostic purposes. The following settings have default
values that are tuned for general production

     slowms = 50
     profile = 3
     objcheck = true
     cpu = true
     verbose = true
     diaglog = 3

Use the :ref:`base configuration <base-config>` and add these options
if you are experiencing some unknown issue or performance problem as
needed:

- :mongodb:setting:`slowms` configures the threshold for a query to be
  considered "slow" by the :term:`database profiler` The default value
  is 100 milliseconds. Set a lower value if the database profiler does
  not return useful results. See the ":doc:`/applications/optimization`"
  for more information on optimizing operations in MongoDB.

- :mongodb:setting:`profile` sets the :term:`database profiler`
  level. The profiler is not active by default because of the possible
  impact on the profiler itself on performance. Unless this setting
  has a value, queries will not be profiled.

- :mongodb:setting:`verbose` enables a verbose logging mode, which
  modifies :option:`mongod` output and logging to include a greater
  number of events. Only use this option if you are experiencing an
  issue that is not reflected in the normal logging level. If you
  require additional verbosity, consider the following options: ::

       v = true
       vv = true
       vvv = true
       vvvv = true
       vvvvv = true

  Each additional level ``v`` adds additional verbosity to the
  logging. The "``verbose``" option  is equal to "``v = true``".

- :mongodb:setting:`diaglog` enables diagnostic logging. Level ``3``
  logs all read and write options.

- :mongodb:setting:`objcheck` forces :option:`mongod` to validate all
  requests from clients upon receipt. Use this option to ensure that
  invalid requests are not causing errors, particularly when running a
  database with untrusted clients. This option may affect database
  performance.

- :mongodb:setting:`cpu` forces ``mongod`` to periodically report CPU
   utilization I/O wait in the logfile. Use this in combination with or
   addition to tools such as :program:`iostat`, :program:`vmstat`, or
   :program:`top` to provide insight into the state of the system
   in context of the log.
