+++
title = "Monitor MongoDB With SNMP on Linux"

[tags]
mongodb = "product"
+++

Enterprise Feature: SNMP is only available in [MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs).


## Overview

MongoDB Enterprise can provide database metrics via SNMP, in
support of centralized data collection and aggregation. This procedure
explains the setup and configuration of a [``mongod``](#bin.mongod) instance
as an SNMP subagent, as well as initializing and testing of SNMP
support with MongoDB Enterprise.

See also: [Troubleshoot SNMP](#) and [Monitor MongoDB Windows with SNMP](#) for complete instructions on using MongoDB with SNMP on Windows systems. 


## Considerations

Only [``mongod``](#bin.mongod) instances provide SNMP
support. [``mongos``](#bin.mongos) and the other MongoDB binaries do not
support SNMP.


## Configuration Files

Changed in version 2.6.

MongoDB Enterprise contains the following configuration files to
support SNMP:

* ``MONGOD-MIB.txt``: 

  The management information base (MIB) file that defines MongoDB's
  SNMP output.

* ``mongod.conf.subagent``: 

  The configuration file to run [``mongod``](#bin.mongod) as the SNMP
  subagent. This file sets SNMP run-time configuration options,
  including the ``AgentX`` socket to connect to the SNMP master.

* ``mongod.conf.master``: 

  The configuration file to run [``mongod``](#bin.mongod) as the SNMP
  master. This file sets SNMP run-time configuration options.


## Procedure


### Step 1: Copy configuration files.

Use the following sequence of commands to move the SNMP
configuration files to the SNMP service configuration directory.

First, create the SNMP configuration directory if needed and then, from
the installation directory, copy the configuration files to the SNMP
service configuration directory:

```sh

mkdir -p /etc/snmp/
cp MONGOD-MIB.txt /usr/share/snmp/mibs/MONGOD-MIB.txt
cp mongod.conf.subagent /etc/snmp/mongod.conf

```

The configuration filename is tool-dependent. For example, when
using ``net-snmp`` the configuration file is ``snmpd.conf``.

By default SNMP uses UNIX domain for communication between the
agent (i.e. ``snmpd`` or the master) and sub-agent (i.e. MongoDB).

Ensure that the ``agentXAddress`` specified in the SNMP
configuration file for MongoDB matches the ``agentXAddress`` in the
SNMP master configuration file.


### Step 2: Start MongoDB.

Start [``mongod``](#bin.mongod) with the ``snmp-subagent`` to send data
to the SNMP master.

```sh

mongod --snmp-subagent

```


### Step 3: Confirm SNMP data retrieval.

Use ``snmpwalk`` to collect data from [``mongod``](#bin.mongod):

Connect an SNMP client to verify the ability to collect SNMP data
from MongoDB.

Install the [net-snmp](http://www.net-snmp.org/) package to access
the ``snmpwalk`` client. ``net-snmp`` provides the ``snmpwalk``
SNMP client.

```sh

snmpwalk -m /usr/share/snmp/mibs/MONGOD-MIB.txt -v 2c -c mongodb 127.0.0.1:<port> 1.3.6.1.4.1.34601

```

``<port>`` refers to the port defined by the SNMP master,
*not* the primary [``port``](#net.port) used by [``mongod``](#bin.mongod) for
client communication.


## Optional: Run MongoDB as SNMP Master

You can run [``mongod``](#bin.mongod) with the ``snmp-master``
option for testing purposes. To do this, use the SNMP master
configuration file instead of the subagent configuration file. From
the directory containing the unpacked MongoDB installation files:

```sh

cp mongod.conf.master /etc/snmp/mongod.conf

```

Additionally, start [``mongod``](#bin.mongod) with the ``snmp-master``
option, as in the following:

```sh

mongod --snmp-master

```
