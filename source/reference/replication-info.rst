==========================
Replication Info Reference
==========================

.. default-domain:: mongodb

The :func:`db.getReplicationInfo()` provides current status of the
current replica status, using data polled from the
":term:`oplog`". Consider the values of this output when diagnosing
issues with replication.

.. seealso:: ":doc:`/core/replication`" for more information on
   replication.

All Nodes
---------

The following fields are present in the output of
:func:`db.getReplicationInfo()` for both :term:`primary` and
:term:`secondary` nodes.

.. status:: logSizeMB

   Returns the total size of the :term:`oplog` in megabytes. This
   refers to the total amount of space allocated to the oplog rather
   than the current size of operations stored in the oplog.

.. status:: usedMB

   Returns the total amount of space used by the :term:`oplog` in
   megabytes. This refers to the total amount of space currently
   used by operations stored in the oplog rather than the total
   amount of space allocated.

Primary Nodes
-------------

The following fields appear in the output of
:func:`db.getReplicationInfo()` for :term:`primary` nodes.

.. status:: errmsg

   Returns the last error status.

.. status:: oplogMainRowCount

   Returns a counter of the number of items or rows
   (i.e. :term:`documents <document>`) in the :term:`oplog`.

Secondary Nodes
---------------

The following fields appear in the output of
:func:`db.getReplicationInfo()` for :term:`secondary` nodes.

.. status:: timeDiff

   Returns the difference between the first and last operation in the
   :term:`oplog`, represented in seconds.

.. status:: timeDiffHours

   Returns the difference between the first and last operation in the
   :term:`oplog`, rounded and represented in hours.

.. status:: tFirst

   Returns a time stamp for the first (i.e. earliest) operation in the
   :term:`oplog`. Compare this value to :status:`now`.

.. status:: tLast

   Returns a time stamp for the first (i.e. earliest) operation in the
   :term:`oplog`. Compare this value to :status:`now`.

.. status:: now

   Returns a time stamp reflecting the current time. The shell process
   generates this value, and the datum may differ slightly from the
   server time if you're connecting from a remote host as a reult. Equivalent to
   :func:`Date()`.
