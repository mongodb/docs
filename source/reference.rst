MMS Reference
=============

This document contains references of the different types of hosts,
databases, and other statuses that may occur in MMS. 

.. contents:: 

.. _host-types: 

Host Types
----------

The possible values for the "Type" column in the Hosts page are:

- primary
- secondary
- standalone
- master
- slave 

The "Host Type" selector on the advanced dashboard creator also
includes: 

- conf
- mongos 

Host Process Types
------------------

MMS can monitor the process types:

- ``mongod`` databases
- ``mongod`` arbiters
- ``mongos``
- MMS Agents


Event Types
-----------

Types of events in the Events section of the MMS console:

- new host
- restart
- upgrade
- now secondary
- now primary

Alert Types
-----------

The available alert types are:

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
