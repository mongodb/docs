Output Example
--------------

The following example is a sample output from the
|method| method run on the primary:

.. code-block:: none

   configured oplog size:   192MB
   log length start to end: 65422secs (18.17hrs)
   oplog first event time:  Mon Jun 23 2014 17:47:18 GMT-0400 (EDT)
   oplog last event time:   Tue Jun 24 2014 11:57:40 GMT-0400 (EDT)
   now:                     Thu Jun 26 2014 14:24:39 GMT-0400 (EDT)

Output Fields
-------------

|method| formats and prints the data returned by
:method:`db.getReplicationInfo()`:
   
configured oplog size
   Displays the :data:`db.getReplicationInfo().logSizeMB` value.

log length start to end
   Displays the :data:`db.getReplicationInfo().timeDiff` and
   :data:`db.getReplicationInfo().timeDiffHours` values.

oplog first event time
   Displays the :data:`db.getReplicationInfo().tFirst`.

oplog last event time
   Displays the :data:`db.getReplicationInfo().tLast`.

now
   Displays the :data:`db.getReplicationInfo().now`.

See :method:`db.getReplicationInfo()` for description of the data.
