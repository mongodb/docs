========================
Replication Fundamentals
========================

This document provides an overview of the core concepts that underpin
MongoDB's replication functionality, known as ":term:`replica sets`."
In these configurations, multiple :option:`mongod` run and maintain
the same set of data in parallel. Having multiple copies of a database
updated at the same time, adds redundancy, increases "read
capacity," and increases the availability of a database in the case of
issues with one or more nodes.

.. seealso:: The ":doc:`/replication`" document for a list of all
   documents in this resource that information on the operation and
   use of MongoDB's replica sets.

Introduction
------------

Fundamentally, MongoDB provides "master/slave," replication where one,
"*master*," node accepts write operations while one or more "*slave*"
nodes mirror or replicate all write operations and thus maintain
data sets that are identical to the master. MongoDB's "replica set"
functionality provides an additional convince, by allowing the

(how replication works)


Core Concepts
-------------

Node Types
~~~~~~~~~~

Delayed Nodes
```````

Hidden Nodes
````````````

Arbiter Nodes
~~~~~~~~~~~~~


Architecture
~~~~~~~~~~~~
(brief)

.. seealso:: ":doc:`/administration/replication-architecture`"

Elections
~~~~~~~~~

Failover
~~~~~~~~

Consistency
~~~~~~~~~~~
(verifying write propagation)

Rollbacks
~~~~~~~~~

Security
~~~~~~~~
.. seealso:: Link to notional section in /administration/security
   on security and replica sets.

Deployment Overview
-------------------
This section needs a better title and will address:

- Should you deploy a replica set or not?
- When to add nodes to an existing replica set.
