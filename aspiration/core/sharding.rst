=====================
Sharding Fundamentals
=====================

MognoDB's sharding functionality allows users to :term:`partition` the
data of a :term:`collection` within a database so that the documents
are automatically distributed among a number of :program:`mongod`
instances. These systems provides a larger write capacity, and allows
a single database instance to have a working set or total data size
that is larger than a single instance can supply.

This document provides an overview of the fundamental concepts and
operation of MongoDB's sharding functionality.

.. seealso:: The ":doc:`/sharding`" index for a list of all documents
   in this manual that contain information related to the operation
   and use of shard clusters in MongoDB.

Overview
--------

MongoDB's sharding is automatic, in that the database will distributes
documents in the sharded collection among shards based on the
specified :term:`shard key` without intervention. A typical
:term:`shard cluster` consists of a configuration server that holds
the metadata that maps documents to shards, the :program:`mongod`
instances that hold the data (i.e :term:`shards <shard>`,) and a
lightweight routing processes, :doc:`mongos </reference/mongos>`, that
routes operations to the correct shard based on the operation and the
cluster metadata.

Requirements
------------

Data
~~~~

Architectures
~~~~~~~~~~~~~

Configuration Servers
---------------------

Shard Keys
----------

:program:`mongos`
-----------------

Balancing and Distribution
--------------------------

Balancing Procedure
~~~~~~~~~~~~~~~~~~~

Shard Size
~~~~~~~~~~

Architecture Possibilities
--------------------------
