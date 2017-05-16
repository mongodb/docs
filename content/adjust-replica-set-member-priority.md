+++
title = "Adjust Priority for Replica Set Member"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Adjust Priority for Replica Set Member


## Overview

The ``priority`` settings of replica set members affect both the timing
and the outcome of [elections](https://docs.mongodb.com/manual/core/replica-set-elections) for
primary. Higher-priority members are more likely to call elections, and
are more likely to win. Use this setting to ensure that some members are
more likely to become primary and that others can never become primary.

The value of the member's
[``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) setting determines the
member's [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) in elections. The higher the number,
the higher the priority.


## Considerations

To modify priorities, you update the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members)
array in the replica configuration object. The array index begins with
``0``. Do **not** confuse this index value with the value of the replica
set member's [``members[n]._id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n]._id) field in the
array.

The value of [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) can be any
floating point (i.e. decimal) number between ``0`` and ``1000``. The
default value for the ``priority`` field is ``1``.

To block a member from seeking election as primary, assign it a priority
of ``0``. [Hidden members](https://docs.mongodb.com/manual/core/replica-set-hidden-member/#replica-set-hidden-members) and
[delayed members](https://docs.mongodb.com/manual/core/replica-set-delayed-member/#replica-set-delayed-members) have
``priority`` set to ``0``.

Changed in version 3.2:

* Non-voting members must have [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) of 0.

* Members with [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) greater than 0 cannot have 0 [``votes``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].votes).

For [arbiters](https://docs.mongodb.com/manual/core/replica-set-arbiter), the default
``priority`` value is ``1``; however, arbiters cannot
become primary regardless of the configured value.

Adjust priority settings during a scheduled maintenance window.
Reconfiguring priority can force the current primary to step down,
leading to an election. Before an election, the primary closes all open
[*client*](https://docs.mongodb.com/manual/reference/glossary/#term-client) connections.


## Procedure

Warning:

  * The [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) shell method can force the current primary to step down, which causes an [election](https://docs.mongodb.com/manual/core/replica-set-elections/#replica-set-elections). When the primary steps down, the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) closes all client connections. While this typically takes 10-20 seconds, try to make these changes during scheduled maintenance periods.

  * Avoid reconfiguring replica sets that contain members of different MongoDB versions as validation rules may differ across MongoDB versions.


### Step 1: Copy the replica set configuration to a variable.

In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, use [``rs.conf()``](https://docs.mongodb.com/manual/reference/method/rs.conf/#rs.conf) to retrieve
the replica set configuration and assign it to a variable. For
example:

```javascript

cfg = rs.conf()

```


### Step 2: Change each member's priority value.

Change each member's [``members[n].priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority)
value, as configured in the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members)
array.

```javascript

cfg.members[0].priority = 0.5
cfg.members[1].priority = 2
cfg.members[2].priority = 2

```

This sequence of operations modifies the value of ``cfg`` to set the
priority for the first three members defined in the
[``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array.


### Step 3: Assign the replica set the new configuration.

Use [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) to apply the new configuration.

```javascript

rs.reconfig(cfg)

```

This operation updates the configuration of the replica set using
the configuration defined by the value of ``cfg``.
