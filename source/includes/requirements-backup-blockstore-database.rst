Blockstore servers store snapshots of MongoDB deployments. Only provision
Blockstore servers if you are deploying |mms| Backup.

Replica Set for the Blockstore Database
+++++++++++++++++++++++++++++++++++++++

Backup requires a separate, **dedicated** MongoDB replica set to hold
snapshot data. This cannot be a replica set used for any
purpose other than holding the snapshots.

The replica set must have at least 3 members **that hold data**. |mms| uses
``w:2`` :manual:`write concern </reference/write-concern>`, which reports a
write operation as successful after acknowledgement from the primary and one
secondary. If you use a replica set with fewer than 3 data-holding members,
and if you lose one of the members, MongoDB blocks write operations.

For *testing only* you may use a standalone MongoDB deployment in place of a
replica set.

Server Size for the Blockstore Database
+++++++++++++++++++++++++++++++++++++++

The replica set must run on servers with enough capacity to store 2 to 3
times the total backed-up data size. Please **contact your MongoDB Account
Manager** for assistance in estimating the storage requirements for your
Blockstore servers.

Configuration Requirements from the MongoDB Production Notes
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Each server that hosts a MongoDB process for the Blockstore database
**must** comply with the :manual:`Production Notes
</administration/production-notes>` in the MongoDB manual. The
Production Notes include important information on :manual:`ulimits
</reference/ulimit>`, :manual:`NUMA
</administration/production-notes#production-numa>`,
:manual:`Transparent Huge Pages (THP)
</reference/transparent-huge-pages>`, and other configuration options.

Other Requirements for the Blockstore Databsase
+++++++++++++++++++++++++++++++++++++++++++++++

Medium grade HDDs should have enough I/O throughput to handle the load of the
Blockstore. Each replica set member should have 4 x 2ghz+ CPU cores. We
recommend 8 GB of RAM for every 1 TB disk of Blockstore to provide good
snapshot and restore speed. |mms| defines 1 TB of Blockstore as 1024\ :sup:`4`
bytes.
