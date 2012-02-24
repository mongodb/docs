.. _mongostat:

.. default-domain:: mongodb

.. binary:: mongostat

===========================
:program:`mongostat` Manual
===========================

Synopsis
--------

The :program:`mongostat` utility provides a quick overview of the
status of a currently running :program:`mongod`
instance. :program:`mongostat` is functionally similar to the
UNIX/Linux file system utility ``vmstat``, but provides data regarding
:program:`mongod` instances.

.. seealso::

   For more information about monitoring MongoDB, see
   :doc:`/administration/monitoring`.

   For more background on various other MongoDB status outputs see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   For an additional utility that provides MongoDB metrics see
   ":doc:`mongotop </reference/mongotop>`."

:program:`mongostat` connects to the :program:`mongod` process running
on the local host interface on TCP port 27017, but
:program:`mongostat` can connect to any accessible remote MongoDB
process.

Options
-------

.. program:: mongostat

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the :program:`mongostat` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the :program:`mongod` from which you
   want to export data. By default :program:`mongostat` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the :option:`--host` argument with
   a setname, followed by a slash and a comma separated list of host
   and port names. The :program:`mongo` utility will, given the seed
   of at least one connected set member, connect to primary node of
   that set. this option would resemble:

   .. code-block:: sh

       --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :option:`mongostat --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow :program:`mongostat` to connect to
   the MongoDB instance using IPv6 connectivity. All MongoDB programs
   and processes, including :program:`mongostat`, disable IPv6 support
   by default.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongostat --password` option to supply a password.

.. option:: --password <password>

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongostat --username` option to
   supply a username.

.. option:: --noheaders

   Disables the output of column or field names.

.. option:: --rowcount <number>, -n <number>

   Controls the number of rows to output. Use in conjunction with
   ":command:`mongostat <sleeptime>`" to control the duration of a
   :program:`mongostat` operation.

   Unless specification, :program:`mongostat` will return an infinite number
   of rows (e.g. value of ``0``.)

.. option:: --http

   Configures :program:`mongostat` to collect data using HTTP interface
   rather than a raw database connection.

.. option:: --discover

   With this option :program:`mongostat` discovers and reports on
   statistics from all members of a :term:`replica set` or
   :term:`shard cluster`. When connected to any member of a replica
   set, :option:`--discover` all non-:term:`hidden members <hidden
   member>` of the replica set. When connected to a :program:`mongos`,
   :program:`mongostat` will return data from all :term:`shards
   <shard>` in the cluster, and when a replica set is provides a shard
   in the shard cluster all non-hidden members of that replica set.

   The :option:`mongostat --host` option is not required but
   potentially useful in this case.

.. option:: --all

   Configures :program:`mongostat` to return all optional :ref:`fields
   <mongostat-fields>`.

.. option:: <sleeptime>

   The final argument the length of time, in seconds, that
   :program:`mongostat` waits in between calls. By default :program:`mongostat`
   returns one call every second.

   :program:`mongostat` returns values that reflect the operations
   over a 1 second period. For values of "``<sleeptime>``" greater
   than 1, :program:`mongostat` averages data to reflect average
   operations per second.

.. _mongostat-fields:

Fields
------

:program:`mongostat` returns values that reflect the operations over a
1 second period. When :command:`mongostat <sleeptime>` has a value
greater than 1, :program:`mongostat` averages the statistics to reflect
average operations per second.

:program:`mongostat` outputs the following fields:

.. describe:: inserts

   The number of objects inserted into the database per second. If
   followed by an asterisk (e.g. "``*``"), the datum refers to a
   replicated operation.

.. describe:: query

   The number of query operations per second.

.. describe:: update

   The number of update operations per second.

.. describe:: delete

   The number of delete operations per second.

.. describe:: getmore

   The number of get more (i.e. cursor batch) operations per second.

.. describe:: command

   The number of commands per second. On :term:`slave` and
   :term:`secondary` systems, :program:`mongostat` presents two values
   separated by a pipe character (e.g. ``|``), in the form of
   "``local|replicated``" commands.

.. describe:: flushes

   The number of :term:`fsync` operations per second.

.. describe:: mapped

   The total amount of data mapped in megabytes. This is the total
   data size at the time of the last :program:`mongostat` call.

.. describe:: size

   The amount of (virtual) memory used by the process at the time of
   the last :program:`mongostat` call.

.. describe:: res

   The amount of (resident) memory used by the process at the time of
   the last :program:`mongostat` call.

.. describe:: faults

   The number of page faults per second. This value is only provided
   for MongoDB instances running on Linux hosts.

.. describe:: locked

   The percent of time in a global write lock.

.. describe:: idx miss

   The percent of index (btree page) misses. This is a sampled value.

.. describe:: qr

   The length of the queue of clients waiting to read data from the
   MongoDB instance.

.. describe:: qw

   The length of the queue of clients waiting to write data from the
   MongoDB instance.

.. describe:: ar

   The number of active clients performing read operations.

.. describe:: aw

   The number of active clients performing write operations.

.. describe:: netIn

   The amount of network traffic, in *bits*, received by the MongoDB.

   This includes traffic from :program:`mongostat` itself.

.. describe:: netOut

   The amount of network traffic, in *bits*, sent by the MongoDB.

   This includes traffic from :program:`mongostat` itself.

.. describe:: conn

   The total number of open connections.

.. describe:: set

   The name, if applicable, of the replica set.

.. describe:: repl

   The replication status of the node.

   =========  ====================
   **Value**  **Replication Type**
   ---------  --------------------
   M          :term:`master`
   SEC        :term:`secondary`
   REC        recovering
   UNK        unknown
   SLV        :term:`slave`
   =========  ====================

Usage
-----

In the first example, :program:`mongostat` will return data every
second for 20 seconds. :program:`mongostat` collects data from the
:program:`mongod` instance running on the localhost interface on
port 27017. All of the following invocations produce identical
behavior:

.. code-block:: sh

   mongostat --rowcount 20 1
   mongostat --rowcount 20
   mongostat -n 20 1
   mongostat -n 20

In the next example, :program:`mongostat` returns data every 5 minutes
(or 300 seconds) for as long as the program runs. :program:`mongostat`
collects data from the :program:`mongod` instance running on the
localhost interface on port ``27017``. Both of the following
invocations produce identical behavior.

.. code-block:: sh

   mongostat --rowcount 0 300
   mongostat -n 0 300
   mongostat 300

In the following example, :program:`mongostat` returns data every 5
minutes for an hour (12 times.) :program:`mongostat` collects data
from the :program:`mongod` instance running on the localhost interface
on port 27017. Both of the following invocations produce identical
behavior.

.. code-block:: sh

   mongostat --rowcount 12 300
   mongostat -n 12 300

In many cases, use the :option:`--discover <mongostat --discover>`
will help provide a more complete snapshot of the state of an entire
group of machines. If a :program:`mongos` process connected to a
:term:`shard cluster` is running on port ``27017`` of the local
machine, you can use the following form to return statistics from all
members of the cluster:

.. code-block:: sh

   mongostat --discover
