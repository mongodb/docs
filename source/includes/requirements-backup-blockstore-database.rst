Blockstore servers store snapshots of MongoDB deployments. Only provision
Blockstore servers if you are deploying |mms| Backup.

Replica Set for the Blockstore Database
+++++++++++++++++++++++++++++++++++++++

Backup requires a separate, **dedicated** MongoDB replica set to hold
snapshot data. This cannot be a replica set used for any
purpose other than holding the snapshots.

For durability, the replica set must have at least two data-bearing
members. For high availability the replica set must have at least three
data-bearing members. If possible, including three 

.. note::

   |mms| uses ``w:2`` :manual:`write concern </reference/write-concern>`,
   which reports a write operation as successful after acknowledgement
   from the primary and one secondary. If you use a replica set with two
   data-bearing members and an arbiter, and you lose one of the
   data-bearing members, write operations will be blocked.

For *testing only* you may use a standalone MongoDB deployment in place of a
replica set.

Server Size for the Blockstore Database
+++++++++++++++++++++++++++++++++++++++

Snapshots are compressed and de-duplicated at the block level in the
Blockstore database. Typically, depending on data compressibility and
change rate, the replica set must run on servers with enough capacity to
store 2 to 3 times the total backed-up production data size. 

**Contact your MongoDB Account Manager** for assistance in estimating the
use-case and workload-dependent storage requirements for your Blockstore
servers.

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

.. warning::

   Failure to configure servers according to the :manual:`MongoDB
   Production Notes </administration/production-notes>` can lead to
   production failure.

Other Requirements for the Blockstore Databsase
+++++++++++++++++++++++++++++++++++++++++++++++

For each data-bearing member of the replica set member

.. list-table::
   :header-rows: 1

   * - **CPU Cores**
     - **RAM**
     - **Disk Space**
     - **Storage IOPS**
   * - 4 x 2ghz+ 
     - 8 GB of RAM for every 1 TB disk of Blockstore to provide good
       snapshot and restore speed. |mms| defines 1 TB of Blockstore as
       1024\ :sup:`4` bytes.
     - Contact your MongoDB Account Manager.
     - Medium grade HDDs should have enough I/O throughput to handle the
       load of the Blockstore.
