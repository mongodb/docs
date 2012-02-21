.. _mongos:

.. default-domain:: mongodb

.. binary:: mongos

========================
:program:`mongos` Manual
========================

Synopsis
--------

:program:`mongos` for "MongoDB Shard," is a routing service for
MongoDB shard configurations that processes queries from the
application layer, and determines the location of this data in the
:term:`shard cluster`, in order to complete these operations these
operations. From the perspective of the application, a
:program:`mongos` instance behaves identically to any other MongoDB
instance.

.. seealso::

   See the ":doc:`/core/sharding`" for more information regarding
   MongoDB's sharding functionality.

Options
-------

.. program:: mongos

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

   Not all configuration options for :program:`mongod` make sense in
   the context of :program:`mongos`.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on standard
   output or in the log file specified by :option:`--logpath`. Use the
   ``-v`` form to control the level of verbosity by including the
   option multiple times, (e.g. ``-vvvvv``.)

.. option:: --quiet

   Runs the :program:`mongos` instance in a quiet mode that attempts to limit
   the amount of output.

.. option:: --port <port>

   Specifies a TCP port for the :program:`mongos` to listen for client
   connections. By default :program:`mongos` listens for connections on
   port 27017.

   UNIX-like systems require root access to access ports with numbers
   lower than 1000.

.. option:: --bind_ip <ip address>

   The IP address that the :program:`mongos` process will bind to and
   listen for connections. By default :program:`mongos` listens for
   connections on the localhost (i.e. ``127.0.0.1`` address.) You may
   attach :program:`mongos` to any interface; however, if you attach
   :program:`mongos` to a publicly accessible interface you must
   implement proper authentication or firewall restrictions to protect
   the integrity of your database.

.. option:: --maxConns <number>

   Specifies the maximum number of simultaneous connections that
   :program:`mongos` will accept. This setting will have no effect if
   the value of this setting is higher than your operating system's
   configured maximum connection tracking threshold.

   This is particularly useful for :program:`mongos` if you have a
   client that creates a number of collections but allows them to
   timeout rather than close the collections. When you set
   :setting:`maxConns`, ensure the value is slightly higher than the
   size of the connection pool or the total number of connections to
   prevent erroneous connection spikes from propagating to the members
   of a :term:`shard` cluster.

.. option:: --objcheck

   Forces the :program:`mongos` to validate all requests from clients upon
   receipt.

.. option:: --logpath <path>

   Specify a path for the log file that will hold all diagnostic
   logging information.

   Unless specified, :program:`mongos` will output all log information to the
   standard output.

.. option:: --logapend

   Specify to ensure that :program:`mongos` appends additional logging
   data to the end of the logfile rather than overwriting the content
   of the log when the process restarts.

.. option:: --pidfilepath <path>

   Specify a file location to hold the ":term:`PID`" or process ID of the
   :program:`mongod` process. Useful for tracking the :program:`mongod` process in
   combination with the :option:`mongos --fork` option.

   Without this option, :program:`mongos` will create a PID file.

.. option:: --keyFile <file>

   Specify the path to a key file to store authentication
   information. This option is only useful for the connection between
   replica set members. See the ":doc:`/core/replication`,"
   ":doc:`/administration/replica-sets`," and
   ":doc:`/administration/security`" documentation for more
   information.

.. option:: --nounixsocket

   Disables listening on the UNIX socket. Without this option
   :program:`mongos` creates a UNIX socket.

.. option:: --unixSocketPrefix <path>

   Specifies a path for the UNIX socket. Unless specified,
   :program:`mongos` creates a socket in the ``/tmp`` path.

.. option:: --fork

   Enables a :term:`daemon` mode for :program:`mongod` which forces the
   process to the background. This is the normal mode of operation, in
   production and production-like environments, but may *not* be
   desirable for testing.

.. option:: --configdb <config1>,<config2><:port>,<config3>

   Set this option to specify a configuration database
   (i.e. :term:`configdb`) for the :term:`shard cluster`. You may
   specify either 1 configuration server or 3 configuration servers,
   in a comma separated list.

.. option:: --test

   This option is for internal testing use only, and runs unit tests
   without starting a :program:`mongos` instance.

.. option:: --upgrade

   This option updates the meta data format used by the
   :term:`configdb`.

.. option:: --chunkSize <value>

   The value of the :option:`--chunkSize` determines the size of each
   :term:`chunk` of data distributed around the :term:`shard
   cluster`. The default value is 64 megabytes, which is
   the ideal size for chunks in most deployments: larger chunk size
   can lead to uneven data distribution, smaller chunk size often
   leads to inefficient movement of chunks between nodes. However, in
   some circumstances it may be neccessary to set a different chunk
   size.

.. option:: --ipv6

   Enables IPv6 support to allow clients to connect to :program:`mongos`
   using IPv6 networks. MongoDB disables IPv6 support by default in
   :program:`mongod` and all utilities.

.. option:: --jsonnp

   Permits :term:`JSONP` access via an HTTP interface. Consider the
   security implications of allowing this activity before enabling
   this option.

.. option:: --noscripting

   Disables the scripting engine.
