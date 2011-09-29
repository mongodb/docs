MMS Reference
=============

This document contains references of the different types of hosts,
databases, and other statuses that may occur in MMS. 

.. contents:: 

.. _host-types: 

Host Types
----------

Possible values for the "Type" column in the Hosts page are: 

- primary
- secondary
- standalone
- conf
- master
- slave 

The "Host Type" selector on the advanced dashboard creator also
includes: 

- mongos 

Host Process Types
------------------

The kinds of processes that MMS can monitor. 

- ``mongod`` databases
- ``mongod`` arbiters
- ``mongos``
- MMS Agents


Event Types
-----------

Possible event types in the Events section of the MMS console:

- new host
- restart
- upgrade
- now secondary
- now primary

Alert Types
-----------

Possible alert types as of October 2011 are:

- Old Host Version
- Host Down 
- Agent Down

.. _mms-chart-types:

MMS Chart Types
---------------

There are 17 possible charts provided by MMS. They are: 

- cpu time
- db storage
- page faults
- repl lag
- replica
- network
- cursors
- queues
- connections
- background flush avg
- lock %
- btree
- non-mapped virtual memory
- memory
- asserts
- opcounters-repl
- opcounters
