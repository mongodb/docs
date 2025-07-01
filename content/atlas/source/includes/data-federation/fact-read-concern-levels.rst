- ``local`` - to return data from an instance with no guarantee that the
  data has been written to a majority of the replica set members. To
  learn more, see :manual:`Read Concern "local" 
  </reference/read-concern-local/>`.  
- ``available`` - to return data from an instance with no guarantee that
  the data has been written to a majority of the replica set members.
  This can return :term:`orphaned documents <orphaned document>` when
  reading from a sharded collection. To learn more, see :manual:`Read
  Concern "available" </reference/read-concern-available/>`.  
- ``majority`` - to return data that has been acknowledged by a
  majority of the nodes on the |service| {+cluster+}. To learn more, see
  :manual:`Read Concern "majority" </reference/read-concern-majority/>`.
- ``linearizable`` - to return data that reflects all successful
  majority-acknowledged writes that completed prior to the start of the
  read operation. To learn more, see :manual:`Read Concern
  "linearizable" </reference/read-concern-linearizable/>`.
- ``snapshot`` - to return majority-committed data as it appears across
  shards from a specific single point in time in the recent past. To
  learn more, see :manual:`Read Concern "snapshot"
  </reference/read-concern-snapshot/>`. 
