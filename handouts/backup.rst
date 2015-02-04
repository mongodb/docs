==============
Backup Service
==============

.. include:: includes/header.tmpl

About this Document
-------------------

:version: 1
:date: 2014-01-31
:status: Beta

.. contents::
   :depth: 2

.. include:: includes/page-decoration.tmpl


Overview
--------

The MongoDB Management Service (MMS) is a service for monitoring and
backing up a MongoDB infrastructure.

Engineered specifically for MongoDB, MMS Backup features scheduled
snapshots and point in time recovery. It can take a consistent
snapshot across multiple shards. Once the service is up and running,
MMS provides a web interface to support backup and restoration. MMS
Backup support horizontal scaling, so that you can support required
availability and durability for the backups.

How Backup Works
----------------

A lightweight agent runs within your infrastructure and connects to
the configured MongoDB instances. Using the same mechanism as
replication the agent will perform an initial sync and then tail the
oplog of a replica set’s primary. For a sharded cluster, the backup
agent will tail the primary of each shard and each config
server. Instead of acting as another local secondary the agent ships
initial sync and oplog data over HTTPS back to the MMS service.

The MMS service recreates every replica set that you backup up and
apply the oplog entries that the backup agents send. MMS then
maintains a standalone MongoDB database on disk for each backed up
replica set (i.e. a "head"). Each head is consistent with the original
primary up to the last oplog supplied by the agent. The original
replica set, or sharded cluster, has no knowledge of this
secondary. The initial sync and tailing of the oplog are all done
using standard MongoDB queries.

The service will take scheduled snapshots of all heads and retain
those snapshots based on a user-defined policy. Replica set snapshots
are triggered based on an observed a change in oplog time. Sharded
clusters snapshots done by temporarily stopping the balancer via the
mongos and inserting a marker token into all shards and config
servers. MMS will take a snapshot when the marker tokens are seen.

Snapshot data is compressed and block-level deduplication technology
is applied, allowing only the differences between successive snapshots
to be stored. This allows many snapshots to be stored with a fraction
of the disk space required for full snapshots.

Restores of specific snapshots and point in time restores are both
available for replica sets (clusters must be restored to a snapshot
time for consistency). A snapshot restore will be read directly from
Snapshot Storage and can be delivered via an HTTPS download link
(pull) or by the MMS service sending the files via SSH (push). A point
in time restore is accomplished by first doing a local restore of a
snapshot from the blockstore. After the MMS service has the snapshot
locally it can apply stored oplogs until the desired point in
time. The service can then deliver the point in time backup via the
same HTTPS or SSH mechanisms. The amount of oplog to keep per backup
is configurable and affects the time window available for point in
time restores.

.. include:: includes/newline.tmpl

Components
----------

MMS Package (Front-end)
~~~~~~~~~~~~~~~~~~~~~~~

The front-end package contains the UI that the end user interacts with
and various HTTPS services used by the monitoring and backup agents to
transmit data to and from MMS. All three of these components are
started automatically when the front-end MMS package is started. These
components themselves are stateless. Multiple instances of the
front-end package can be running as long as they have the same
configuration. Users and agents can interact with any instance.

MMS HTTP Server
```````````````

The HTTP server runs on port 8080 by default.  This component contains
the web interface for managing MMS users, monitoring of MongoDB
servers, and managing those server’s backups. When you visit
https://mms.mongodb.com you are interacting with the hosted version of
this component. Users can sign up, create new accounts/groups, and
join an existing group. The MMS Web Server also contains endpoints
used by the MMS Agent to report back information on monitored MongoDB
instances.

Backup HTTP Server
``````````````````

The HTTP server runs on port 8081 by default. The Backup HTTP Server
contains a set of web services used by the backup agent. The agent
retrieves its configuration from this service. The agent also sends
back initial sync and oplog data through this interface. There is no
user interaction with this service.

Backup Alert Service
````````````````````

The Backup Alert Service watches the state of all agents, heads, and
snapshots. It will send email alerts when problems are found.

Backup Daemon Package (Back-end)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Backup Daemon is the only component found in the Backup Daemon
package. The Backup Daemon manages all heads and snapshots. The daemon
does scheduled work based on data coming in to the Backup HTTP server
from the backup agents. No client applications talk directly to the
daemon. Its state and job queues come from the MMS Metadata Database.

The Daemon creates the heads on its local disk, in a configured
path. If there are multiple servers running the daemon, new incoming
backups will be assigned to an appropriate Daemon and that backup's
head will live with that Daemon.

The Daemon will take scheduled snapshots and stores those snapshots in
the Snapshot Storage (also known as the Blockstore). It will also act
on restore requests by retrieving data from the Blockstore and
delivering it to the requested destination.

Multiple Backup Daemons can be run to scale MMS horizontally, but each
replica will be bound to a particular Daemon.

Data Storage
~~~~~~~~~~~~

All data about the state of the MMS service, and the backup snapshot
data, is persisted in MongoDB databases. These databases are not part
of the MMS package installation. They must be set up separately and
their location provided in the MMS configuration files.

MMS Metadata Database
`````````````````````

This database will contain MMS users, groups, hosts, monitoring data,
backup state, etc. All of this metadata should be relatively small in
size (less than 1GB per monitored/backed up server) but will be
updated frequently. It is highly recommended that this database be
configured as a replica set to provide durability and automatic
failover from the MMS service.

Snapshot Storage (Blockstore Database)
``````````````````````````````````````

This database will contain all snapshots of databases being backed up
and oplogs that are being retained for point in time restores. It is
expected to be very large in disk size, but proportional to the size
of the databases that are being backed up. The Blockstore should also
be configured as a replica set to provide durability and automatic
failover to the backup and restore components.

Hardware Requirements
---------------------

Sizing By Component
~~~~~~~~~~~~~~~~~~~

MMS Package (Front-end)
```````````````````````

This package requires a minimum of 4 x 2ghz+ CPU cores and 16GB of RAM
to get started. This setup will have enough capacity to monitor and
backup approximately 200 servers. All replica set members, config
servers, and mongos servers are counted. There are no specific hard
disk requirements as all data used by this package is persisted in the
configured MongoDB databases. As more servers are monitored and backed
up additional front-end instances can be added.

Backup Daemon Package (Back-end)
````````````````````````````````

A server running the Daemon package will be acting as a hidden
secondary for every replica set that it is assigned. 4 x 2ghz+ CPU
cores and 16GB of RAM will be adequate for most load generated by this
activity. Since it will not be dealing with read traffic, a server
running a Backup Daemon will typically be able to be assigned many
more replica sets then a server with production traffic. The limiting
factor on how many backups a Daemon can be assigned will be disk. The
server running this package will need enough disk to hold a full copy
of every databases it is backing up. It will also need enough write
I/O throughput to handle applying oplogs to each one of those
backups.

As an example, take a sharded cluster with four shards, each being
200GB. Looking at a secondary for each one of the shards it appears
the disk averages 15MB/sec of write traffic. A Backup Daemon assigned
these four shards would need at least 800GB of disk space (in reality
more to handle growth) and that disk partition would need to be able
to write more than 60MB/sec.

Point in time restore capability requires enough space to reconstruct
a snapshot of a backup on the Daemon. In the example above, doing a
point in time restore of this cluster would required another 800GB of
temporary space on the Daemon during the restore. Snapshot restores do
not require any additional disk space.

MMS Metadata Database
`````````````````````

Each replica set member should have 4 x 2ghz+ CPU cores and 16GB of
RAM. 200GB of disk space will be adequate for the first 200
servers. Since this data is updated very frequently high-end disk,
preferably SSDs are recommended. If the capacity of this server is
reached it can either be upgraded or additional replica sets can be
brought online and different types of MMS data can be split between
them by changing the MMS configuration.

Snapshot Storage / Blockstore Database
``````````````````````````````````````

The amount of storage needed to store a replica set backup in the
Blockstore database is calculated by looking at the file size of the
replica set being backed up, gigabytes of oplog per hour generated by
the replica set, compression ratio of the data, and the configured
snapshot retention schedule.

Using the four shard, 200GB per shard cluster example from above, also
add 2GB/day of oplogs generated per shard or 8GB/day total across the
cluster. If the longest snapshot being stored has a one year retention
period the approximate amount of data in the blockstore will be
800GB + (8GB * 365 days) or 3720GB. If the data gets a 4:1 compression
ratio, which is an average seen in the hosted MMS, the blockstore
space required will actually be 930GB.

930GB is a very conservative number because it assumes that 8GB of
oplog in one day changes 8GB of data on disk. The other extreme is
that 8GB of oplog could all be $inc operations on the same
document. In that case, 8GB of oplog could only change 4 bytes on
disk. In practice the number will be somewhere in between depending on
the replica sets insert/update/delete patterns.

A good rule of thumb of looking at the MMS hosted service is a replica
set will take up 2x - 3x its size in the Blockstore.

Medium grade HDDs will have enough i/o throughput to handle the load
of the Blockstore. Each replica set member should have 4 x 2ghz+ CPU
cores. 8GB of RAM for every 1TB disk of Blockstore is recommended to
provide good snapshot and restore speed.

Combining Components
~~~~~~~~~~~~~~~~~~~~

Each of these components does not require its own server, the CPU and
RAM requirements can be aggregated together. Each component should
still have its own disk partition with the recommended amount of
storage space and i/o throughput.

A configuration used in the MMS hosted environment is to have multiple
RAIDs attached to each high-end physical server. Each server may be
running a combination of a Blockstore primary/secondary, a Backup
Daemon, and a MMS Metadata primary/secondary. The front-end package
can be run on a much smaller server as it only has modest CPU and RAM
requirements.

High Availability Setup
-----------------------

MMS Package (Front-end)
~~~~~~~~~~~~~~~~~~~~~~~

This component is stateless and can be made highly available using
similar strategies to other web servers. A load balancer (either layer
4 or layer 7) can be placed in front of the instances of this package
to distribute requests. If N servers are needed for the desired
capacity, more than N servers should be behind the load balancer so
that a certain number of losses does not degrade performance. N+1 or
N+2 are common configurations.

Backup Daemon Package (Back-end)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While the system as a whole protects the Daemon against data loss,
manual intervention is required if a Daemon is lost. A Daemon
exclusively owns a set of backups. If it is down, those backups will
not continue. There are built-in MMS alerts that will notify the
system administrator that backups for falling behind. If the Daemon
can be be repaired, the backups will continue where they left off. If
it must be replaced, the backups need to be manually assigned to a
different Daemon in the Admin section of the MMS UI.

The process of moving a backup from one Daemon to another involves
doing a self restore of the previous snapshot from the
Blockstore. This makes the daemons somewhat ephemeral and the
durability of the backup data lives in the Blockstore replica set.

MMS Metadata Database / Blockstore Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These should be standard MongoDB replica sets. All MongoDB best
practices should be followed to make these replica sets highly
available and durable.

Software Requirements
---------------------

MMS requires 64-bit Linux. MMS supports the following distributions:

- CentOS 5 or later

- Red Hat Enterprise Linux 5 or later

- Amazon Linux (latest version only)

- SLES 11 or later

- Ubuntu 12.04 or later

The MongoDB databases backing MMS must be MongoDB 2.4.9 or later.

The MongoDB replica sets and sharded clusters tobe backed up must be
running MongoDB 2.4.3 or later.

OS Configuration
----------------

Ulimit
~~~~~~

It is extremely important that ulimits be configured correctly. The
MMS/Backup HTTP server under load and the Backup Daemon launching many
``mongod`` instances will quickly hit most linux distributions default ulimits. The
following settings are recommended for the ``/etc/security/limits.conf``
file on all servers running the front-end or back-end package. ::

   mongodb-mms        soft   nofile           64000
   mongodb-mms        hard   nofile           64000
   mongodb-mms        soft   nproc            32000
   mongodb-mms        hard   nproc            32000

   mongod           soft   nofile           64000
   mongod           hard   nofile           64000
   mongod           soft   nproc            32000
   mongod           hard   nproc            32000

Be sure to check for a ``/etc/security/limits.d/90-nproc.conf`` file
that may override the configured limits.

For any servers running a MMS Metadata Database or a Blockstore
Database, see the production notes
(http://docs.mongodb.org/manual/administration/production-notes/) page
for more specific recommendations.

Firewall
~~~~~~~~

The front-end package will default to running web servers on ports
8080 and 8081.

.. include:: includes/newline.tmpl

Installation
------------

The following instructions must be executed as root.

1. Install a MongoDB server (or replica set) for the MMS databases.

Detailed instructions on getting started with a MongoDB installation
can be found at http://www.mongodb.org/downloads

2. Install a MongoDB server (or replica set) for the Backup databases.

3. Install a MongoDB server (or replica set) for the Blockstore database.

4. Install the MMS software.

The software consists of two packages:

1. The front-end package: ``mongodb-mms-brs-X.X-X_X.x86_64.rpm`` or
   ``mongodb-mms-brs-X.X.X.x86_64.deb``

2. The back-end package:
   ``mongodb-backup-daemon-X.X-X_X.x86_64.rpm`` or
   mongodb-backup-daemon-X.X.X.x86_64.deb.

To install the front-end package on RHEL, CentOS, Amazon Linux, or
SLES run: ::

   rpm -ivh mongodb-mms-brs-X.X-X_X.x86_64.rpm

To install the front-end package on Ubuntu run: ::

   dpkg -i mongodb-mms-brs-X.X.X.x86_64.deb

The software will be installed to ``/opt/mongodb/mms``. Open the
application configuration file at
``/opt/mongodb/mms/conf/conf-mms.properties`` and fill in all of the
required configuration. All of the MongoDB connections default to
localhost. If you are not running the MMS and Backup databases on this
server change these values to the correct host.

The backup database configuration setting (called ``backupdb``) should
point to the Backup database, setup in step 2. All other database
connections in the front-end config file are for the MMS database and
should point to the MMS database from step.

More detailed information on MMS configuration can be found at
http://mms.mongodb.com/help-hosted.

To start the front-end package run: ::

   service mongodb-mms start

If everything worked the following should be displayed: ::

   Start MMS server
      Instance 0 starting...                                  [  OK  ]
   Start Backup HTTP Server
      Instance 0 starting...                                  [  OK  ]
   Start Backup Alert Process                                 [  OK  ]

You should now be able to view MMS by going to the configured central URL in a web
browser. The default port of MMS is 8080.

If you run into any problems, the log files canbe found at
``/opt/mongodb/mms/logs``.

To install the back-end package on RHEL, CentOS, Amazon Linux, or SLES
run: ::

   rpm -ivh mongodb-backup-daemon-X.X-X_X.x86_64.rpm

To install the back-end backup on Ubuntu run: ::

   dpkg -i mongodb-backup-daemon-X.X.X.x86_64.deb

The software will be installed to /opt/mongodb/backup-daemon. Open the
application configuration file at
``/opt/mongodb/backup-daemon/conf/conf-daemon.properties`` and fill in
all of the required configuration.

Same as the front-end package the MMS settings should point to the
database setup in step 1, the Backup setting to the database in step
2, and the Blockstore setting to the database setup in step 3.

To start the back-end package run: ::

   service mongodb-backup-daemon start

If everything worked the following will be displayed: ::

   Start Backup Daemon                                        [  OK  ]

If you run into any problems, the log files can be found at
``/opt/mongodb/backup-daemon/logs``.

Use
---

To begin backing up a replica set or sharded cluster the MongoDB
instances must first be monitored by MMS. For instructions on
installing the MMS agent and adding instances refer to the
mms-manual.pdf.

After your instances are monitored by MMS, the instructions for the
hosted version of BRS can be used to get started backing up your first
replica set or sharded cluster.

Enable Backup for a Replica Set
https://mms.mongodb.com/help/backup/tutorial/enable-backup-for-replica-set/

Enable Backup for a Sharded Cluster
https://mms.mongodb.com/help/backup/tutorial/enable-backup-for-sharded-cluster/

Restore from a Stored Snapshot
https://mms.mongodb.com/help/backup/tutorial/restore-from-snapshot/

Restore from a Point in the Last 24 Hours
https://mms.mongodb.com/help/backup/tutorial/restore-from-point-in-time-snapshot/

Upgrades
--------

Version 1.2.1
~~~~~~~~~~~~~

The MMS service now requires MongoDB 2.4.9 or later.
