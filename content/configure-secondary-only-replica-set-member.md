+++
title = "Prevent Secondary from Becoming Primary"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Prevent Secondary from Becoming Primary


## Overview

In a replica set, by default all [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) members are eligible to
become primary through the election process. You can use the
``priority`` to affect the
outcome of these elections by making some members more likely to become
primary and other members less likely or unable to become primary.

Secondaries that cannot become primary are also unable to trigger
elections. In all other respects these secondaries are identical to other
secondaries.

To prevent a [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) member from ever becoming a [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary)
in a [*failover*](https://docs.mongodb.com/manual/reference/glossary/#term-failover), assign the secondary a priority of ``0``, as
described here. For a detailed description of secondary-only members and their purposes,
see [Priority 0 Replica Set Members](https://docs.mongodb.com/manual/core/replica-set-priority-0-member).


## Considerations

When updating the replica configuration object, access the replica set
members in the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array with the
**array index**. The array index begins with ``0``. Do **not** confuse
this index value with the value of the
[``members[n]._id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n]._id) field in each document in
the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array.

Note: MongoDB does not permit the current [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to have a priority of ``0``. To prevent the current primary from again becoming a primary, you must first step down the current primary using [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown).


## Procedure

This tutorial uses a sample replica set with 5 members.

Warning:

  * The [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) shell method can force the current primary to step down, which causes an [election](https://docs.mongodb.com/manual/core/replica-set-elections/#replica-set-elections). When the primary steps down, the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) closes all client connections. While this typically takes 10-20 seconds, try to make these changes during scheduled maintenance periods.

  * Avoid reconfiguring replica sets that contain members of different MongoDB versions as validation rules may differ across MongoDB versions.


### Step 1: Retrieve the current replica set configuration.

The [``rs.conf()``](https://docs.mongodb.com/manual/reference/method/rs.conf/#rs.conf) method returns a [replica set
configuration document](https://docs.mongodb.com/manual/reference/replica-configuration) that
contains the current configuration for a replica set.

In a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to a primary, run the
[``rs.conf()``](https://docs.mongodb.com/manual/reference/method/rs.conf/#rs.conf) method and assign the result to a variable:

```javascript

cfg = rs.conf()

```

The returned document contains a
[``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) field which contains an array
of member configuration documents, one document for each member of the
replica set.


### Step 2: Assign priority value of ``0``.

To prevent a secondary member from becoming a primary, update the
secondary member's [``members[n].priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority)
to ``0``.

To assign a priority value to a member of the replica set, access the
member configuration document using the array index. In this
tutorial, the secondary member to change corresponds to the
configuration document found at position ``2`` of the
[``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array.

```javascript

cfg.members[2].priority = 0

```

The configuration change does not take effect until you reconfigure
the replica set.


### Step 3: Reconfigure the replica set.

Use [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) method to reconfigure the replica set
with the updated replica set configuration document.

Pass the ``cfg`` variable to the [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) method:

```javascript

rs.reconfig(cfg)

```


## Related Documents

* [``members[n].priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority)

* [Adjust Priority for Replica Set Member](adjust-replica-set-member-priority/)

* [Replica Set Reconfiguration](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#replica-set-reconfiguration-usage)

* [Replica Set Elections](https://docs.mongodb.com/manual/core/replica-set-elections)
