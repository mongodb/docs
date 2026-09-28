.. _replica-set-write-concern:

==============================
Write Concern for Replica Sets
==============================

.. meta::
   :description: Configure write concern for replica sets to ensure data durability and manage latency by specifying the number of members that must acknowledge a write.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

:ref:`Write concern <write-concern>` for replica sets describe the 
number of data-bearing members (i.e. the primary and secondaries, 
but not arbiters) that must acknowledge a write operation before the
operation returns as successful. A member can only acknowledge a 
write operation after it has received and applied the write 
successfully. 

For replica sets: 

- A write concern of :writeconcern:`w: "majority" <"majority">` requires 
  acknowledgment that the write operations have been durably committed to a
  :ref:`calculated majority <calculating-majority-count>` of the data-bearing 
  voting members. For most replica set configurations, :writeconcern:`w: 
  "majority" <"majority">` is the :ref:`default write concern 
  <wc-default-behavior>`. 
  
- A write concern of :writeconcern:`w: 1 <\<number\>>` only requires 
  acknowledgment from the primary replica set member before returning 
  write concern acknowledgment. 

- A write concern with a numeric value greater than ``1`` requires 
  acknowledgment from the primary and as many secondaries as needed to meet the 
  specified value. The secondaries do not need to be voting members to meet the 
  write concern threshold. The specified write concern value cannot be greater 
  than the total number of data-bearing members in the replica set. 

For complete documentation on write acknowledgment 
behavior, see :ref:`wc-ack-behavior`. 

.. include:: /images/crud-write-concern-w-majority.rst

An application that issues a write operation that requires
write concern acknowledgment waits until the primary receives
acknowledgment from the required number of members for the specified
write concern. For write concern of ``w`` greater than 1 or 
``w : "majority"``, the primary waits until the required number of 
secondaries acknowledge the write before returning write concern 
acknowledgment. For write concern of ``w: 1``, the primary can return
write concern acknowledgment as soon as it locally applies the write
since it is eligible for contributing to the requested write concern. 

The more members that acknowledge a write, the less likely the written 
data could roll back if the 
:ref:`primary fails <replication-auto-failover>`. However, specifying 
a high write concern can increase latency as the client must wait until 
it receives the requested level of write concern acknowledgment. 

Selecting the ideal write concern for any given write operation depends
on your application's performance goals and data durability 
requirements. For more guidance on configuring write concern to 
prevent rollbacks, see :ref:`rollback-avoid`.

Verify Write Operations to Replica Sets
---------------------------------------

The following operation includes the ``writeConcern`` option for
the :method:`~db.collection.insertOne()` method. The operation
specifies:
- the :writeconcern:`"majority"` write concern, and
- a 5 second timeout.

The :ref:`wc-wtimeout` write concern parameter ensures that the
operation does not block indefinitely.

.. code-block:: javascript

   db.products.insertOne(
      { item: "envelopes", qty : 100, type: "Clasp" },
      { writeConcern: { w: "majority" , wtimeout: 5000 } }
   )

The application waits until the primary returns write concern
acknowledgment, indicating that a :ref:`calculated majority
<calculating-majority-count>` of the data-bearing voting members
acknowledged the write operation. For example, in a 3-member
replica set (P-S-S), the operation would require acknowledgment from 2 out of
the 3 members. If the replica set was later scaled to include two 
additional voting secondary members, the same operation would require 
acknowledgment from 3 out of the 5 replica set members. If the 
primary does not return write concern acknowledgment within the 
``wtimeout`` limit, the write operation fails with a write concern 
error.

A write operation that times out waiting for the specified write concern 
only indicates that the required number of replica set members did not 
acknowledge the write operation within the ``wtimeout`` time period.
It does not necessarily indicate that the primary failed to apply the 
write. The data may exist on a subset of replica set nodes at the time 
of the write concern error, and can continue replicating until all 
nodes in the cluster have that data. Applications should take into 
account the potential availability of written data regardless of the 
state of write concern acknowledgment. 

The exact syntax for specifying write concern depends on the write 
operation. Refer to the documentation for the write operation for 
instructions on write concern support and syntax. For complete 
documentation on write concern, see :ref:`write-concern`.

.. _repl-set-modify-default-write-concern:

Modify Default Write Concern
----------------------------

You can modify the default write concern for a replica set by issuing 
the :dbcommand:`setDefaultRWConcern` command.

If you issue a write operation with a specific write concern, the write
operation uses its own write concern instead of the default.

.. seealso::

   :doc:`/reference/write-concern`

Custom Write Concerns
---------------------

You can :ref:`tag <replica-set-configuration-tag-sets>` the
members of replica sets and use the resulting tag sets to create custom write
concerns. See :ref:`replica-set-configuration-tag-sets` for
information on configuring custom write concerns using tag sets.
