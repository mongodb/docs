====================
mongod Daemon Manual
====================

Synopsis
--------

``mongod`` is the primary daemon process for the MongoDB system. It
handles data requests, manages data format, and preforms background
management operations.

This document provides a complete overview of all command line options
for ``mongod``. These options are primarily useful for testing
purposes. In common operation, use the :doc:`configuration file
options </reference/configuration-options>` to control the behavior of
your database, which is fully capable of all operations described
below.

Options
-------

.. program:: mongod

.. option:: --help, -h

   Returns a basic help and usage text.

.. option:: --version

   Returns the version of the ``mongod`` daemon.

.. option:: --config <filname>, -f <filename>

   Specifies a configuration file, that you can use to specify
   runtime-configurations. While the options are equivalent and
   accessible via the other command line arguments, the configuration
   file is the preferred method for runtime configuration of
   mongod. See the ":doc:`/reference/configuration-options`" document
   for more information about these options.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on standard
   output or in the log file specified by :option:`--logpath`. Use the
   the ``-v`` form to control the level of verbosity by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --quiet

   Runs the ``mongod`` instance in a quiet mode that attempts to limit
   the amount of output.

.. option:: --port <port>

   Specifies a TCP port for the ``mongod`` to listen for client
   connections. By default ``mongod`` listens for connections on
   port 27017.

   On UNIX-like systems root access is required for ports with numbers
   lower than 1000.

.. option:: --bind_ip <ip address>

   The IP address that the ``mongod`` process will bind to and listen
   for connections. By default ``mongod`` listens for connections on
   the localhost (i.e. ``127.0.0.1`` address.) You may attach
   ``mongod`` to any interface; however, if you attach ``mongod`` to a
   publicly accessible interface ensure that proper authentication or
   firewall restrictions have been implemented to protect the
   integrity of your database.

.. option:: --maxCons <number>

   Specifies the maximum number of simultaneous connections that
   ``mongod`` will accept. This setting will have no effect if it is
   higher than your operating system's configured maximum connection
   tracking threshold.

.. option:: --objcheck

   Forces the ``mongod`` to validate all requests from clients upon
   receipt.

TODO understand what this does.

.. option:: --logpath <path>

   Specify a path for the log file that will hold all diagnostic
   logging information.

   Unless specified, ``mongod`` will output all log information to
   the standard output.

.. option:: --pidfilepath <path>

   Specify a file location to hold the ":term:`PID`" or process ID of the
   ``mongod`` process. Useful for tracking the ``mongod`` process in
   combination with the :option:`mongod --fork` option.

.. option:: --keyFile <file>

   Specify the path to a key file to store authentication
   information. This option is only useful for the connection between
   replica set members. See the ":doc:`/replication`" documentation
   for more information.

TODO insert link to replication documentation when it exists.

.. option:: --nounixsocket

   Disables listening on the UNIX socket, which is enabled unless
   this option is specified.

.. option:: --unixSocketPrefix <path>

   Specifies a path for the UNIX socket. Unless specified the socket
   is created in the ``/tmp`` path.

.. option:: --fork

   Enables a :term:`daemon` mode for ``mongod`` which forces the
   process to the background. This is the normal mode of operation, in
   production and production-like environments, but may *not* be
   desirable for testing.

.. option:: --auth

   Enables database authentication for users connecting from remote
   hosts. Users are configured via the :doc:`mongo shell
   </utilities/mongo>`. If no users exist, the localhost interface
   will continue to have access to the database until a user has been
   created.

   See the ":doc:`/security-authentication`"  document for more
   information regarding this functionality.

.. option:: --cpu

   Forces ``mongod`` to periodically report CPU utilization and the
   amount of time that the processor waits for I/O operations to
   complete (i.e. I/O wait.) This data is written to standard output
   or the logfile if using the :option:`mongod --logpath` option.

.. option:: --dbpath <path>

   Specify a directory for the ``mongod`` instance to store its
   data. Typically locations such as: "``/srv/mognodb``",
   "``/var/lib/mongodb``" or "``/opt/mongodb``" are used for this
   purpose.

   Unless specified, the ``/data/db`` directory will be used on
   Unix-like systems.

.. option:: --diaglog <value>

   Sets the diagnostic logging level for the ``mongod``
   instance. Possible values, and their impact are as follows.

   =========  ===================================
   **Value**  **Setting**
   ---------  -----------------------------------
      0       off. No logging.
      1       Log write operations.
      2       Log read operations.
      3       Log both read and write operations.
      7       Log write and some read operations.
   =========  ===================================

.. option:: --directoryperdb

   Alters the storage pattern of the data directory so that each
   database is stored in a distinct folder.

   Unless specified, all databases will be included in the directory
   specified by :option:`--dbpath`.

.. option:: --journal

   Enables operation journaling to ensure write durability and data
   consistency
.
.. option:: --journalOptions <arguments>

   Provides functionality for testing. Not for general use, and may
   affect database integrity.

.. option:: --journalCommitInterval <value>

   Specifies the maximum amount of time for ``mongod`` to allow
   between journal operations. The default value is 100 milliseconds,
   while possible values range from 2 to 300 milliseconds. Lower
   values increase the durability of the journal, at the expense of
   disk performance.

.. option:: --ipv6

   Enables IPv6 support to allow clients to connect to ``mongod``
   using IPv6 networks. IPv6 support is disabled by default in
   ``mongod`` and all utilities.

.. option:: --jsonnp

   Permits :term:`JSONP` access via an HTTP interface. Consider the
   security implications of allowing this activity before enabling
   this option.

.. option:: --noauth

   Disable authentication. Currently the default. Exists for future
   compatibility and clarity.

.. option:: --nohttpinterface

   Disables the HTTP interface.

.. option:: --nojournal

   Disables the durability journaling, which is enabled by default in
   64-bit versions after v2.0.

.. option:: --noprealloc

   Disables the preallocation of data files. This will shorten the
   start up time in some cases, but can cause significant performance
   penalties during normal operations.

.. option:: --noscripting

   Disables the scripting engine.

.. option:: --notablescan

   Forbids operations that require a table scan.

.. option:: --nssize <value>

   Specifies the default value for namespace files (i.e
   ``.ns``). This option has no impact on the size of existing
   namespace files.

   The default value is 16 megabytes.

.. option:: --profile <level>

   Changes the level of database profiling, which inserts information
   about operation performance into output of ``mongod`` or the log
   file. The following levels are available:

   =========  ==================================
   **Level**  **Setting**
   ---------  ----------------------------------
      0       Off. No profiling.
      1       On. Only includes slow operations.
      2       On. Includes all operations.
   =========  ==================================

   Profiling is off by default. Database profiling can impact database
   performance, and can cause potentially sensitive information to be
   written to the log. Enable this option only after careful
   consideration.

.. option:: --quota

   Enables a maximum limit for the number data files each database can
   have. The default quota is 8 data files, if this option is
   set. Adjust the quota with the :option:`--quotaFiles` option.

.. option:: --quotaFiles <number>

   Modify limit on the number of data files per database. This option
   requires the :option:`--quota` setting. By default this option is
   set to 8.

.. option:: --rest

   Enables the simple :term:`REST` API.

.. option:: --repair

   Runs a repair routine on all databases.

.. option:: --repairpath <path>

   Specifies the root directory containing MongoDB data files, to use
   for the :option:`--repair` operation. Defaults to the value
   specified by :option:`--dbpath`.

.. option:: --slowms <value>

   Defines the value of "slow," for the :option:`--profile`
   option. Operations that run take longer than the specified period
   to run are reported by the profiler.

.. option:: --smallfiles

   Enables a mode where MongoDB uses a smaller default file size.

TODO how big does --smallfiles specify?

.. option:: --shutdown

TODO how does --shutdown work does it figure out what process has the lock and kill it or something else?

.. option:: --syncdelay <value>

   The maximum number of seconds between disk syncs. The default
   setting is "``60``". While data is being written do disk all the time,
   this setting controls the maximum guaranteed length of time between
   a successful write operation and when that data will be flushed to
   disk.

   If set to "``0``", all operations will be flushed to disk, which
   may have a significant performance impact. If :option:`--journal`
   is specified, all writes will be durable, by way of the journal
   within the time specified by :option:`--journalCommitInterval`.

.. option:: --sysinfo

   Returns diagnostic system information and then exits.

.. option:: --upgrade

   Upgrades the on-disk data format of the files specified by the
   :option:`--dbpath` to the latest version, if needed.

   This option only affects the operation of ``mongod`` if the
   data files are in an old format.

Replica Set Options
```````````````````

.. option:: --fastsync

   Run with this option if this replica has been seeded with a
   snapshot of the :term:`dbpath` of another member of the
   set. Otherwise the ``mongod`` will attempt to perform a full sync.

.. option:: --oplogSize <value>

   Specifies a maximum size in megabytes for the replication op log.

Master/Slave Replication
````````````````````````

These options provide access to conventional master-slave database
replication. While this functionality remains accessible in MongoDB,
replica sets are the prefered configuration for database replication.

.. option:: --master

   Configures ``mongod`` to run this node as a replication
   :term:`master`.

.. option:: --slave

   Configures ``mongod`` to run this node as a replication
   :term:`slave`.

.. option:: --source <host>:<port>

   For use with the :option:`--slave` option, the ``--source`` option
   designates the node that will replicate.

.. option:: --only <arg>

   For use with the :option:`--slave` option, the ``--only`` option
   specifies only a single :term:`database` to replicate.

.. option:: --slavedelay <value>

   For use with the :option:`--slave` option, the ``--slavedelay``
   option configures a "delay" in seconds, for this slave to wait to
   apply operations from the :term:`master` node.

.. option:: --autoresync

   For use with the :option:`--slave` option, the ``--autoresync``
   option allows this slave to automatically resync if the local data
   becomes too stale. This option may be problematic if the
   :term:`oplog` is too small (controlled by the :option:`--oplogSize`
   option.) If the :term:`oplog` not large enough to store the
   difference in changes between the master's current state and the
   state of the slave, this node will forcibly resync itself
   unnecessarily.

TODO determine threshold for --autoresync

Replica Set Options
```````````````````

.. option:: --replSet <setname>

   Use this option to configure replication with replica sets. Specify
   a setname as an argument to this set. All hosts must have the same
   set name. You can add one or more "seed" hosts to one or more host
   in the set to initiate the cluster. Use the following form: ::

        <setname>/<host1>,<host2>:<port>

   When you add or reconfigure the replica set on one host, these
   changes propagate throughout the cluster.

Sharding Cluster Options
````````````````````````

.. option:: --configsvr

   Declares that this ``mongod`` instance serves as the :term:`config
   database` of a shard cluster. The default port with this option is
   ``27019` and the data is stored in the ``/configdb`` sub-directory
   of the :option:`--dbpath` directory.

.. option:: --shardsvr

   Configures this ``mongod`` instance as a node in a shard
   cluster. The default port for these nodes is ``27018``.

.. option:: --noMoveParanoia

   Disables a "paranoid mode" for data writes for the
   :command:`moveChunk`.

Usage
-----

In common usage, the invocation of ``mongod`` will resemble the
following in the context of an initialization or control script: ::

        mongod --config /etc/mongodb.conf

See the ":doc:`/reference/configuration-options`" for more information
on how to configure ``mongod`` using the configuration file.
