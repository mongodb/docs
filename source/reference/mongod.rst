.. _mongod:

.. default-domain:: mongodb

.. binary:: mongod

========================
:program:`mongod` Manual
========================

Synopsis
--------

:program:`mongod` is the primary daemon process for the MongoDB
system. It handles data requests, manages data format, and preforms
background management operations.

This document provides a complete overview of all command line options
for :program:`mongod`. These options are primarily useful for testing
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

   Returns the version of the :program:`mongod` daemon.

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
   ``-v`` form to control the level of verbosity by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --quiet

   Runs the :program:`mongod` instance in a quiet mode that attempts to limit
   the amount of output.

.. option:: --port <port>

   Specifies a TCP port for the :program:`mongod` to listen for client
   connections. By default :program:`mongod` listens for connections on
   port 27017.

   UNIX-like systems require root privileges to use ports with numbers
   lower than 1000.

.. option:: --bind_ip <ip address>

   The IP address that the :program:`mongod` process will bind to and
   listen for connections. By default :program:`mongod` listens for
   connections on the localhost (i.e. ``127.0.0.1`` address.) You may
   attach :program:`mongod` to any interface; however, if you attach
   :program:`mongod` to a publicly accessible interface ensure that
   you have implemented proper authentication and/or firewall
   restrictions to protect the integrity of your database.

.. option:: --maxCons <number>

   Specifies the maximum number of simultaneous connections that
   :program:`mongod` will accept. This setting will have no effect if
   it is higher than your operating system's configured maximum
   connection tracking threshold.

.. option:: --objcheck

   Forces the :program:`mongod` to validate all requests from clients
   upon receipt to ensure that invalid objects are never inserted into
   the database. This option can produce a significant performance
   impact.

.. option:: --logpath <path>

   Specify a path for the log file that will hold all diagnostic
   logging information.

   Unless specified, :program:`mongod` will output all log information to
   the standard output. Unless you specify :option:`--logapend`, the
   logfile will be overwritten when the process restarts.

.. option:: --logapend

   When specified, this option ensures that :program:`mongod` appends
   new entries to the end of the logfile rather than overwriting the
   content of the log when the process restarts.

.. option:: --syslog

   .. versionadded: 2.1.0

   Sends all logging output to the host's :term:`syslog` system rather
   than to standard output or a log file as with :option:`--logpath`.

   .. warning:: You cannot use :option:`--syslog` with :option:`--logpath`.

.. option:: --pidfilepath <path>

   Specify a file location to hold the ":term:`PID`" or process ID of
   the :program:`mongod` process. Useful for tracking the
   :program:`mongod` process in combination with the :option:`mongod --fork`
   option.

   If this option is not set, :program:`mongod` will create no PID file.

.. option:: --keyFile <file>

   Specify the path to a key file to store authentication
   information. This option is only useful for the connection between
   replica set members.

   .. seealso:: ":ref:`Replica Set Security <replica-set-security>`"
      and ":doc:`/administration/replica-sets`."

.. option:: --nounixsocket

   Disables listening on the UNIX socket. Unless set to false,
   :program:`mongod` and :program:`mongos` provide a UNIX-socket.

.. option:: --unixSocketPrefix <path>

   Specifies a path for the UNIX socket. Unless this option has a
   value, :program:`mongod` and :program:`mongos`, create a socket
   with the ``/tmp`` as a prefix.

.. option:: --fork

   Enables a :term:`daemon` mode for :program:`mongod` which forces the
   process to the background. This is the normal mode of operation, in
   production and production-like environments, but may *not* be
   desirable for testing.

.. option:: --auth

   Enables database authentication for users connecting from remote
   hosts. configure users via the :doc:`mongo shell shell
   </reference/mongo>`. If no users exist, the localhost interface
   will continue to have access to the database until the you create
   the first user.

   See the ":doc:`/administration/security`" document for more
   information regarding this functionality.

.. option:: --cpu

   Forces :program:`mongod` to report the percentage of CPU time in
   write lock. :program:`mongod` generates output ever four
   seconds. MongoDB writes this data to standard output or the logfile
   if using the :setting:`logpath` option.

.. option:: --dbpath <path>

   Specify a directory for the :program:`mongod` instance to store its
   data. Typical locations include: "``/srv/mognodb``",
   "``/var/lib/mongodb``" or "``/opt/mongodb``"

   Unless specified, :program:`mongod` creates data files in the
   default ``/data/db`` directory. (Windows systems use the
   ``\data\db`` directory.)

.. option:: --diaglog <value>

   Sets the diagnostic logging level for the :program:`mongod`
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

   Alters the storage pattern of the data directory to store each
   (logical) database in a distinct folder. Use this option to
   configure MongoDB to store data on a number of distinct disk
   devices to increase write throughput or disk capacity.

   Unless specified, :program:`mongod` saves all database files in the
   directory specified by :option:`--dbpath`.

.. option:: --journal

   Enables operation journaling to ensure write durability and data
   consistency. :program:`mongodb` enables journaling by default on
   64-bit builds of versions after 2.0.

.. option:: --journalOptions <arguments>

   Provides functionality for testing. Not for general use, and may
   affect database integrity.

.. option:: --journalCommitInterval <value>

   Specifies the maximum amount of time for :program:`mongod` to allow
   between journal operations. The default value is 100 milliseconds,
   while possible values range from 2 to 300 milliseconds. Lower
   values increase the durability of the journal, at the expense of
   disk performance.

.. option:: --ipv6

   Specify this option to enable IPv6 support. This will allow clients
   to connect to :program:`mongod` using IPv6
   networks. :program:`mongod` disables IPv6 support by default in
   :program:`mongod` and all utilities.

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

   Disables the durability journaling. By default, :program:`mongod`
   enables journaling in 64-bit versions after v2.0.

.. option:: --noprealloc

   Disables the preallocation of data files. This will shorten the
   start up time in some cases, but can cause significant performance
   penalties during normal operations.

.. option:: --noscripting

   Disables the scripting engine.

.. option:: --notablescan

   Forbids operations that require a table scan.

.. option:: --nssize <value>

   Specifies the default value for namespace files (i.e ``.ns``). This
   option has no impact on the size of existing namespace files.

   The default value is 16 megabytes, this provides for effectively
   12,000 possible namespace. The maximum size is 2 gigabytes.

.. option:: --profile <level>

   Changes the level of database profiling, which inserts information
   about operation performance into output of :program:`mongod` or the log
   file. The following levels are available:

   =========  ==================================
   **Level**  **Setting**
   ---------  ----------------------------------
      0       Off. No profiling.
      1       On. Only includes slow operations.
      2       On. Includes all operations.
   =========  ==================================

   Profiling is off by default. Database profiling can impact database
   performance. Enable this option only after careful consideration.

.. option:: --quota

   Enables a maximum limit for the number data files each database can
   have. When running with :option:`--quota``, there are a maximum of
   8 data files per database. Adjust the quota with the
   :option:`--quotaFiles` option.

.. option:: --quotaFiles <number>

   Modify limit on the number of data files per database. This option
   requires the :option:`--quota` setting. The default value for
   :option:`--quotaFiles` is 8.

.. option:: --rest

   Enables the simple :term:`REST` API.

.. option:: --repair

   Runs a repair routine on all databases.

   .. note::

      Because :program:`mongod` rewrites all of the database files
      during the repair routine, if you do not run :option:`--repair`
      under the same user account as :program:`mongod` usually runs,
      you will need to run ``chown`` on your database files to correct
      the permissions before starting :program:`mongod` again.

.. option:: --repairpath <path>

   Specifies the root directory containing MongoDB data files, to use
   for the :option:`--repair` operation. Defaults to the value
   specified by :option:`--dbpath`.

.. option:: --slowms <value>

   Defines the value of "slow," for the :option:`--profile`
   option. The :term:`database profiler` reports operations that take
   longer to run than the specified period.

.. option:: --smallfiles

   Enables a mode where MongoDB uses a smaller default file
   size. Specifically, :option:`--smallfiles` quarters the initial
   file size for data files and limits the maximum file size to 512
   megabytes.

   Use :option:`--smallfiles` if you have a large number of databases
   that each holds a small quaint of data.

.. option:: --shutdown

   Used in :term:`control scripts <control script>`, the
   :option:`--shutdown` will cleanly and safely terminate the
   :program:`mongod` process. When invoking :program:`mongod` with this
   option you must set the :option:`--dbpath` option either directly
   or by way of the :doc:`configuration file
   </reference/configuration-options>` and the :option:`--config`
   option.

.. option:: --syncdelay <value>

   This setting contrils the maximum number of seconds between disk
   syncs. While :program:`mongod` is always writing data to disk, this
   setting controls the maximum guaranteed interval between a
   successful write operation and the next time the database flushes
   data to disk.

   In many cases, the actual interval between write operations and
   disk flushes is much shorter than the value

   If set to "``0``", :program:`mongod` flushes all operations to disk
   immediately, which may have a significant performance impact. If
   :option:`--journal` is ``true``, all writes will be durable, by way
   of the journal within the time specified by
   :option:`--journalCommitInterval`.

.. option:: --sysinfo

   Returns diagnostic system information and then exits.

.. option:: --upgrade

   Upgrades the on-disk data format of the files specified by the
   :option:`--dbpath` to the latest version, if needed.

   This option only affects the operation of :program:`mongod` if the
   data files are in an old format.

Replica Set Options
```````````````````

.. option:: --fastsync

   In the context of :term:`replica set` replication, set this option
   if you have seeded this replica with a snapshot of the
   :term:`dbpath` of another member of the set. Otherwise the
   :program:`mongod` will attempt to perform a full sync.

   .. warning::

      If the data is not perfectly synchronized *and*
      :program:`mongod` starts with :setting:`fastsync`, then the
      secondary or slave will be permanently out of sync with the
      primary, which may cause significant consistency problems.

.. option:: --oplogSize <value>

   Specifies a maximum size in megabytes for the replication operation
   log (e.g. :term:`oplog`.) By :program:`mongod` creates an
   :term:`oplog` based on the maximum amount of space available. For
   64-bit systems, the op log is typically 5% of available disk space.

Master/Slave Replication
````````````````````````

These options provide access to conventional master-slave database
replication. While this functionality remains accessible in MongoDB,
replica sets are the prefered configuration for database replication.

.. option:: --master

   Configures :program:`mongod` to run as a replication
   :term:`master`.

.. option:: --slave

   Configures :program:`mongod` to run as a replication
   :term:`slave`.

.. option:: --source <host>:<port>

   For use with the :option:`--slave` option, the ``--source`` option
   designates the server that this instance will replicate.

.. option:: --only <arg>

   For use with the :option:`--slave` option, the ``--only`` option
   specifies only a single :term:`database` to replicate.

.. option:: --slavedelay <value>

   For use with the :option:`--slave` option, the ``--slavedelay``
   option configures a "delay" in seconds, for this slave to wait to
   apply operations from the :term:`master` node.

.. option:: --autoresync

   For use with the :option:`--slave` option, the
   :option:`--autoresync` option allows this slave to automatically
   resync if the local data is more than 10 seconds behind the
   master. This option may be problematic if the :term:`oplog` is too
   small (controlled by the :option:`--oplogSize` option.) If the
   :term:`oplog` not large enough to store the difference in changes
   between the master's current state and the state of the slave, this
   node will forcibly resync itself unnecessarily. When you set the If
   the :option:`--autoresync` option the slave will not attempt an
   automatic resync more than once in a ten minute period.

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

   Declares that this :program:`mongod` instance serves as the
   :term:`config database` of a shard cluster. The default port for
   :program:`mongod` with this option is ``27019` and
   :program:`mongod` writes all data files to the ``/configdb``
   sub-directory of the :option:`--dbpath` directory.

.. option:: --shardsvr

   Configures this :program:`mongod` instance as a shard in a
   partitioned cluster. The default port for these instances is ``27018``.

.. option:: --noMoveParanoia

   Disables a "paranoid mode" for data writes for the
   :dbcommand:`moveChunk`.

Usage
-----

In common usage, the invocation of :program:`mongod` will resemble the
following in the context of an initialization or control script:

.. code-block:: sh

   mongod --config /etc/mongodb.conf

See the ":doc:`/reference/configuration-options`" for more information
on how to configure :program:`mongod` using the configuration file.
