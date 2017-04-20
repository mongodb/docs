+++
title = "Adjust Priority for Replica Set Member"

[tags]
mongodb = "product"
+++


## Overview

The ``priority`` settings of replica set members affect both the timing
and the outcome of [elections](#) for
primary. Higher-priority members are more likely to call elections, and
are more likely to win. Use this setting to ensure that some members are
more likely to become primary and that others can never become primary.

The value of the member's
[``priority``](#rsconf.members[n].priority) setting determines the
member's [``priority``](#rsconf.members[n].priority) in elections. The higher the number,
the higher the priority.


## Considerations

To modify priorities, you update the [``members``](#rsconf.members)
array in the replica configuration object. The array index begins with
``0``. Do **not** confuse this index value with the value of the replica
set member's [``members[n]._id``](#rsconf.members[n]._id) field in the
array.

The value of [``priority``](#rsconf.members[n].priority) can be any
floating point (i.e. decimal) number between ``0`` and ``1000``. The
default value for the ``priority`` field is ``1``.

To block a member from seeking election as primary, assign it a priority
of ``0``. [Hidden members](#replica-set-hidden-members) and
[delayed members](#replica-set-delayed-members) have
``priority`` set to ``0``.

Changed in version 3.2: 

* Non-voting members must have [``priority``](#rsconf.members[n].priority) of 0. 

* Members with [``priority``](#rsconf.members[n].priority) greater than 0 cannot have 0 [``votes``](#rsconf.members[n].votes). 

For [arbiters](#), the default
``priority`` value is ``1``; however, arbiters cannot
become primary regardless of the configured value.

Adjust priority settings during a scheduled maintenance window.
Reconfiguring priority can force the current primary to step down,
leading to an election. Before an election, the primary closes all open
[*client*](#term-client) connections.


## Procedure

Warning:   

  * The [``rs.reconfig()``](#rs.reconfig) shell method can force the current primary to step down, which causes an [election](#replica-set-elections). When the primary steps down, the [``mongod``](#bin.mongod) closes all client connections. While this typically takes 10-20 seconds, try to make these changes during scheduled maintenance periods. 

  * Avoid reconfiguring replica sets that contain members of different MongoDB versions as validation rules may differ across MongoDB versions. 


### Step 1: Copy the replica set configuration to a variable.

In the [``mongo``](#bin.mongo) shell, use [``rs.conf()``](#rs.conf) to retrieve
the replica set configuration and assign it to a variable. For
example:

```javascript

cfg = rs.conf()

```


### Step 2: Change each member's priority value.

Change each member's [``members[n].priority``](#rsconf.members[n].priority)
value, as configured in the [``members``](#rsconf.members)
array.

```javascript

cfg.members[0].priority = 0.5
cfg.members[1].priority = 2
cfg.members[2].priority = 2

```

This sequence of operations modifies the value of ``cfg`` to set the
priority for the first three members defined in the
[``members``](#rsconf.members) array.


### Step 3: Assign the replica set the new configuration.

Use [``rs.reconfig()``](#rs.reconfig) to apply the new configuration.

```javascript

rs.reconfig(cfg)

```

This operation updates the configuration of the replica set using
the configuration defined by the value of ``cfg``.
