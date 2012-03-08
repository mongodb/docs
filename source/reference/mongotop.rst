.. _mongotop:

.. default-domain:: mongodb

.. binary:: mongotop

==========================
:program:`mongotop` Manual
==========================

Synopsis
--------

:program:`mongotop` provides a method to track the amount of time a
MongoDB instance spends reading and writing data. :program:`mongotop`
provides statistics on the per-collection level. In default operation,
:program:`mongotop` returns values every second.

TODO "in default operation" = "by default", maybe less confusing

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

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the :program:`mongotop` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` from which you
   want to export data. By default :program:`mongotop` attempts to
   connect to a MongoDB process ruining on the localhost port number
   ``27017``.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the :option:`--host` argument with
   a setname, followed by a slash and a comma separated list of host
   and port names. The :program:`mongo` utility will, given the seed
   of at least one connected set member, connect to primary node of
   that set. this option would resemble:

TODO is "setname" a well-defined mongodb term? I usually write "replica set name" which is pretty clumsy sounding

   .. code-block:: sh

      --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :option:`mongotop --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow :program:`mongotop` to connect to the
   MongoDB instance using IPv6 connectivity. :program:`mongotop` and
   other MongoDB programs disable IPv6 support by default.

TODO I'm not an ipv6 whiz by any means -- but is "connectivity" the right word? (seems like too much connect* in one sentence)

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if
   your database requires authentication. Use in conjunction with the
   :option:`mongotop <mongotop --password>` option to supply a
   password.

.. option:: --password <password>

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`--username <mongotop --username>`
   option to supply a username.

TODO I believe that mongotools will prompt for a password if flag is used without a value

.. option:: <sleeptime>

   The final argument the length of time, in seconds, that
   :program:`mongotop` waits in between calls. By default
   :program:`mongotop` returns data every second.

.. _mongotop-fields:

Fields
------

:program:`mongotop` returns time values specified in milliseconds
(ms.)

.. data:: ns

   The database namespace, and includes the database name and
   collection. :program:`mongotop` only reports active namespaces. If
   you don't see a database or collection, it has received no recent
   activity. You can issue a simple operation in the :program:`mongo`
   shell to generate activity so that an specific namespace appears on
   the page.

TODO ", and includes" should this be ", which includes"?

.. data:: total

   Provides the total amount of time that this :program:`mongod` spent
   operating on this namespace.

.. data:: read

   Provides the amount of time that this :program:`mongod` spent
   performing read operations on this namespace.

.. data:: write

   Provides the amount of time that this :program:`mongod` spent
   performing write operations on this namespace.

.. data:: <timestamp>

   Provides a time stamp for the returned data.

Usage
-----

By default :program:`mongotop` connects to the MongoDB instance
ruining on the localhost port 27017; however, you can optionally
connect :program:`mongotop` to connect to remote :program:`mongod`
instances. See the :ref:`mongotop options <mongotop-options>` for more
information.

To force :program:`mongotop` to return less frequently specify a number, in
seconds at the end of the command. In this example, :program:`mongotop` will
return every 15 seconds.

.. code-block:: sh

   mongotop 15

Use the following command to return a :program:`mongotop` report every 5
minutes:

.. code-block:: sh

   mongotop 300
