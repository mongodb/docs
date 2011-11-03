=======================
mongotop Utility Manual
=======================

Synopsis
--------

The ``mongotop`` utility provides an overview

.. seealso::

   For more information about monitoring MongoDB, see
   :doc:`/administration/monitoring`.

   For more background on various other MongoDB status outputs see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   For an additional utility that provides MongoDB metrics
   see ":doc:`mongostat </utilities/mongostat>`."

Options
-------

.. program:: mongotop

.. option:: .. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongotop`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` from which you
   want to export data. By default ``mongotop`` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

TODO sort out ( <set name>/s1,s2 for sets)

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

Fields
------

.. describe:: ns

.. describe:: total

.. describe:: read

.. describe:: write

.. describe:: [timestamp]

Usage Examples
--------------

TODO import basic assumptions
