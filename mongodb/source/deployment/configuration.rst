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

This includes the following settings. For most standalone servers,
this is a sufficient base configuration. It makes the following
assumptions to set these configuration variables.

- :mongodb:setting:`fork`" Is set to ``true`` to enable a :term:`daemon` mode
  for ``mongod``, which detaches (i.e. "forks") the MongoDB from the
  current session and allows you to run the database as a conventional
  server.

- ":mongodb:setting:`bind_ip`" is set to ``127.0.0.1`` and forces the server
  to only listen for requests on the localhost IP. Ideally, the server
  should only bind to secure interfaces that specific
  application-level systems can access, with access control provided
  by system network filtering (i.e. ":term:`firewall`) systems.

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
  :doc:`journaling <journaling>` which ensures single instance
  write-durability. On 64-bit systems, this is enabled by default and
  thus may be a redundant setting.

In some cases these settings may be redundant, given the default
configuration; however, in many cases explicitly stating your
configuration increases intelligibility of configuration.

Security Considerations
-----------------------

- running
- bind_ip
- port
- keyfile

Replication and Sharding Configuration
--------------------------------------

Replication Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

- replset

Sharding Configuration
~~~~~~~~~~~~~~~~~~~~~~

- shardsvr
- configsvr
- configdb
- chunkSize

Running Multiple Database Instances on the Same System
------------------------------------------------------

- dbpath
- pidpath

Diagnostics Configurations
--------------------------

- slowms
- objcheck
- cpu
- profile
- verbose
- logpath, logapend
- dialog
