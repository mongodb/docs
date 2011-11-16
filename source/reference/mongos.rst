=============
mongos Manual
=============

Synopsis
--------

``mongos`` for "MongoDB Shard," is a routing service for MongoDB shard
configurations that processes queries from the application layer, and
determines where this data is stored in the :term:`shard cluster`, in
order to complete these operations these operations. From the
perspective of the application, a ``mongos`` instance behaves
identically to any other MongoDB instance.

.. seealso::

   See the ":doc:`/sharding`" for more information regarding MongoDB's
   sharding functionality.

Options
-------

.. program:: mongos

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

   Not all configuration options for :option:`mongod` make sense in
   the context of ``mongos``.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on standard
   output or in the log file specified by :option:`--logpath`. Use the
   ``-v`` form to control the level of verbosity by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --quiet

   Runs the ``mongos`` instance in a quiet mode that attempts to limit
   the amount of output.

.. option:: --port <port>

   Specifies a TCP port for the ``mongos`` to listen for client
   connections. By default ``mongos`` listens for connections on
   port 27017.

   On UNIX-like systems root access is required for ports with numbers
   lower than 1000.

.. option:: --bind_ip <ip address>

   The IP address that the ``mongos`` process will bind to and listen
   for connections. By default ``mongos`` listens for connections on
   the localhost (i.e. ``127.0.0.1`` address.) You may attach
   ``mongos`` to any interface; however, if you attach ``mongos`` to a
   publicly accessible interface ensure that proper authentication or
   firewall restrictions have been implemented to protect the
   integrity of your database.

.. option:: --maxCons <number>

   Specifies the maximum number of simultaneous connections that
   ``mongos`` will accept. This setting will have no effect if it is
   higher than your operating system's configured maximum connection
   tracking threshold.

.. option:: --objcheck

   Forces the ``mongos`` to validate all requests from clients upon
   receipt.

.. option:: --logpath <path>

   Specify a path for the log file that will hold all diagnostic
   logging information.

   Unless specified, ``mongos`` will output all log information to the
   standard output.

.. option:: --logapend

   Specify to ensure that new entries will be added to the end of the
   logfile rather than overwriting the content of the log when the
   process restarts.

.. option:: --pidfilepath <path>

   Specify a file location to hold the ":term:`PID`" or process ID of the
   ``mongod`` process. Useful for tracking the ``mongod`` process in
   combination with the :option:`mongos --fork` option.

   If this option is not set, no PID file is created.

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

.. option:: --configdb <config1>,<config2><:port>,<config3>

   Set this option to specify a configuration database
   (i.e. :term:`configdb`) for the :term:`shard cluster`. You may
   specify either 1 configuration server or 3 configuration servers,
   in a comma separated list.

  --test                just run unit tests
  --upgrade             upgrade meta data version
  --chunkSize arg       maximum amount of data per chunk

.. option:: --test

   This option is for internal testing use only, and runs unit tests
   without starting a ``mongos`` instance.

.. option:: --upgrade

   This option updates the meta data format used by the
   :term:`configdb`.

.. option:: --chunksize <value>

   The value of this option determines the size of each :term:`chunk`
   of data distributed around the :term:`shard cluster`. The default
   value is 64 megabytes, which is accepted as the ideal size for
   chunks for most deployments: larger chunk size can lead to uneven
   data distribution, smaller chunk size often leads to inefficient
   movement of chunks between nodes. However, in some circumstances
   it may be neccessary to set a different chunk size.

.. option:: --ipv6

   Enables IPv6 support to allow clients to connect to ``mongos``
   using IPv6 networks. IPv6 support is disabled by default in
   ``mongod`` and all utilities.

.. option:: --jsonnp

   Permits :term:`JSONP` access via an HTTP interface. Consider the
   security implications of allowing this activity before enabling
   this option.

.. option:: --noscripting

   Disables the scripting engine.
