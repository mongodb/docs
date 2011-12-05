===================
``mongotop`` Manual
===================

Synopsis
--------

The ``mongotop`` utility provides a method to track the amount of time
spent on read and write activity for a MongoDB instance. ``mongotop``
provides statistics on the per-collection level. In default operation,
mongotop returns values every second.

.. seealso::

   For more information about monitoring MongoDB, see
   :doc:`/administration/monitoring`.

   For additional background on various other MongoDB status outputs
   see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   For an additional utility that provides MongoDB metrics
   see ":doc:`mongostat </reference/mongostat>`."

.. _mongotop-options:

Options
-------

.. program:: mongotop

.. option:: .. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongotop`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` from which you
   want to export data. By default ``mongotop`` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the ``--host`` argument with a
   setname, followed by a slash and a comma separated list of host and
   port names. The ``mongo`` utility will, given the seed of at least
   one connected set member, connect to primary node of that set. this
   option would resemble: ::

        --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :command:`mongotop --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow ``mongotop`` to connect to the
   MongoDB instance using IPv6 connectivity. IPv6 support is disabled
   by default in the ``mongotop`` utility.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongotop --password` option to supply a password.

.. option:: --password [password]

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongotop --username` option to
   supply a username.

.. option:: [sleeptime]

   The final argument the length of time, in seconds, that
   ``mongotop`` waits in between calls. By default ``mongotop``
   returns data every second.

.. _mongotop-fields:

Fields
------

All time values are provided in milliseconds (ms.)

.. describe:: ns

   The database namespace, and includes the database name and
   collection. Only namespaces with activity are reported. If you
   don't see a collection, it has received no activity. You can issue
   a simple operation in the :command:`mongo` shell to generate
   activity so that an specific namespace appears on the page.

TODO factcheck

.. describe:: total

   Provides the total amount of time that this ``mongod`` spent
   operating on this namespace.

.. describe:: read

   Provides the amount of time that this ``mongod`` spent performing
   read operations on this namespace.

.. describe:: write

   Provides the amount of time that this ``mongod`` spent performing
   write operations on this namespace.

.. describe:: [timestamp]

   Provides a time stamp for the returned data.

Usage
-----

By default ``mongotop`` connects to the MongoDB instance ruining on
the localhost port 27017; however, you can optionally connect
``mongotop`` to connect to remote ``mongod`` instances. See the
:ref:`mongotop options <mongotop-options>` for more information.

To force ``mongotop`` to return less frequently specify a number, in
seconds at the end of the command. In this example, ``mongotop`` will
return every 15 seconds.

     mongotop 15

Use the following command to return a ``mongotop`` report every 5
minutes: ::

     mongotop 300
