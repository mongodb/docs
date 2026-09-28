
.. _replica-set-delayed-configuration:
.. _replica-set-delayed-members:
.. _replica-set-delayed-replication:

===========================
Delayed Replica Set Members
===========================

.. meta::
   :description: Understand how delayed replica set members provide a rolling backup by maintaining a historical snapshot of data, useful for recovering from errors.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Delayed members contain copies of a :term:`replica set's <replica
set>` data set. However, a delayed member's data set reflects an
earlier, or delayed, state of the set. For example, if the current
time is 09:52 and a member has a delay of an hour, the delayed member
has no operation more recent than 08:52.

Because delayed members are a "rolling backup" or a running
"historical" snapshot of the data set, they may help you recover from
various kinds of human error. For example, a delayed member can make
it possible to recover from unsuccessful application upgrades and
operator errors including dropped databases and collections.

Considerations
--------------

Requirements
~~~~~~~~~~~~

Delayed members:

- **Must be** :ref:`priority 0 <replica-set-secondary-only-members>`
  members. Set the priority to 0 to prevent a delayed member from
  becoming primary.

- **Must be** :ref:`hidden <replica-set-hidden-members>`
  members. Always prevent applications from seeing and querying
  delayed members.

- *Do* vote in :term:`elections <election>` for primary, if 
  :rsconf:`members[n].votes` is set to 1. Ensuring that delayed members 
  are non-voting by setting :rsconf:`members[n].votes` to 0 can help 
  improve performance.

.. include:: /includes/important-delayed-replica-set-members.rst

Behavior
~~~~~~~~

Delayed members copy and apply operations from the source :term:`oplog` on a delay.
When choosing the amount of delay, consider that the amount of delay:

- must be equal to or greater than your expected maintenance window durations.

- must be *smaller* than the capacity of the oplog. For more
  information on oplog size, see :ref:`replica-set-oplog-sizing`.

Write Concern
~~~~~~~~~~~~~

Delayed replica set members can acknowledge write operations issued with either: 

- :writeconcern:`w: \<number\> <\<number\>>`. In this case, delayed members can  
  acknowledge write operations even if they are non-voting members.

- :writeconcern:`w : "majority" <"majority">`. In this case,
  delayed members must be voting members (that is, :rsconf:`members[n].votes` greater 
  than ``0``) to acknowledge the write operation. Non-voting replica 
  set members (that is, :rsconf:`members[n].votes` is ``0``) cannot contribute to 
  acknowledging write operations with ``majority`` write concern.

Delayed secondaries can return write acknowledgment no earlier than the 
configured :rsconf:`~members[n].secondaryDelaySecs`.

For more information, refer to the :ref:`write concern "w" Option <wc-w>`.

Sharding
~~~~~~~~

In sharded clusters, delayed members have limited utility when the
:term:`balancer` is enabled. Because delayed members replicate chunk
migrations with a delay, the state of delayed members in a sharded
cluster are not useful for recovering to a previous state of the
sharded cluster if any migrations occur during the delay window.

Example
-------

In the following 5-member replica set, the primary and all secondaries
have copies of the data set. One member applies operations with a
delay of 3600 seconds (one hour). This delayed member is also
*hidden* and is a *priority 0 member*.

.. include:: /images/replica-set-delayed-member.rst

Configuration
-------------

A delayed member has its
:rsconf:`members[n].priority` equal to ``0``,
:rsconf:`members[n].hidden` equal to ``true``, and
its :rsconf:`members[n].secondaryDelaySecs` equal to the
number of seconds of delay:

.. code-block:: javascript

   {
      "_id" : <num>,
      "host" : <hostname:port>,
      "priority" : 0,
      "secondaryDelaySecs" : <seconds>,
      "hidden" : true
   }

To configure a delayed member, see
:doc:`/tutorial/configure-a-delayed-replica-set-member`.
