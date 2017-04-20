+++
title = "Monitor MongoDB Windows with SNMP"

[tags]
mongodb = "product"
+++

Enterprise Feature: SNMP is only available in [MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs).


## Overview

MongoDB Enterprise can provide database metrics via SNMP, in
support of centralized data collection and aggregation. This procedure
explains the setup and configuration of a [``mongod.exe``](#bin.mongod.exe) instance
as an SNMP subagent, as well as initializing and testing of SNMP
support with MongoDB Enterprise.

See also: [Monitor MongoDB With SNMP on Linux](#) and [Troubleshoot SNMP](#) for more information. 


## Considerations

Only [``mongod.exe``](#bin.mongod.exe) instances provide SNMP
support. [``mongos.exe``](#bin.mongos.exe) and the other MongoDB binaries do not
support SNMP.


## Configuration Files

Changed in version 2.6.

MongoDB Enterprise contains the following configuration files to
support SNMP:

* ``MONGOD-MIB.txt``: 

  The management information base (MIB) file that defines MongoDB's
  SNMP output.

* ``mongod.conf.subagent``: 

  The configuration file to run [``mongod.exe``](#bin.mongod.exe) as the SNMP
  subagent. This file sets SNMP run-time configuration options,
  including the ``AgentX`` socket to connect to the SNMP master.

* ``mongod.conf.master``: 

  The configuration file to run [``mongod.exe``](#bin.mongod.exe) as the SNMP
  master. This file sets SNMP run-time configuration options.


## Procedure


### Step 1: Copy configuration files.

Use the following sequence of commands to move the SNMP
configuration files to the SNMP service configuration directory.

First, create the SNMP configuration directory if needed and then, from
the installation directory, copy the configuration files to the SNMP
service configuration directory:

```powershell

md C:\snmp\etc\config
copy MONGOD-MIB.txt C:\snmp\etc\config\MONGOD-MIB.txt
copy mongod.conf.subagent C:\snmp\etc\config\mongod.conf

```

The configuration filename is tool-dependent. For example, when
using ``net-snmp`` the configuration file is ``snmpd.conf``.

Edit the configuration file to ensure that the communication
between the agent (i.e. ``snmpd`` or the master) and sub-agent
(i.e. MongoDB) uses TCP.

Ensure that the ``agentXAddress`` specified in the SNMP
configuration file for MongoDB matches the ``agentXAddress`` in the
SNMP master configuration file.


### Step 2: Start MongoDB.

Start [``mongod.exe``](#bin.mongod.exe) with the ``snmp-subagent`` to send data
to the SNMP master.

```powershell

mongod.exe --snmp-subagent

```


### Step 3: Confirm SNMP data retrieval.

Use ``snmpwalk`` to collect data from [``mongod.exe``](#bin.mongod.exe):

Connect an SNMP client to verify the ability to collect SNMP data
from MongoDB.

Install the [net-snmp](http://www.net-snmp.org/) package to access
the ``snmpwalk`` client. ``net-snmp`` provides the ``snmpwalk``
SNMP client.

```powershell

snmpwalk -m C:\snmp\etc\config\MONGOD-MIB.txt -v 2c -c mongodb 127.0.0.1:<port> 1.3.6.1.4.1.34601

```

``<port>`` refers to the port defined by the SNMP master,
*not* the primary [``port``](#net.port) used by [``mongod.exe``](#bin.mongod.exe) for
client communication.


## Optional: Run MongoDB as SNMP Master

You can run [``mongod.exe``](#bin.mongod.exe) with the ``snmp-master``
option for testing purposes. To do this, use the SNMP master
configuration file instead of the subagent configuration file. From
the directory containing the unpacked MongoDB installation files:

```powershell

copy mongod.conf.master C:\snmp\etc\config\mongod.conf

```

Additionally, start [``mongod.exe``](#bin.mongod.exe) with the ``snmp-master``
option, as in the following:

```powershell

mongod.exe --snmp-master

```
