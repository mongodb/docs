==============================
Runtime Database Configuration
==============================

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

- fork
- bind_ip
- port
- dbpath
- maxCons

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
