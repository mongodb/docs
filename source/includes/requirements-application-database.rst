The :ref:`mms-application-database` holds the
monitoring information for the :ref:`mms-application-package`.

The database runs as a three-member :term:`replica set`. If you cannot
allocate space for three data-bearing members, the third member can be an
arbiter, but keep in mind that |mms| uses ``w:2`` :manual:`write concern
</reference/write-concern>`, which reports a write operation as successful
after acknowledgement from the primary and one secondary. If you use a replica
set with fewer than 3 data-bearing members, and if you lose one of the
data-bearing members, MongoDB blocks write operations.

Run the replica set on dedicated servers. You can optionally run one
member of the replica set on the same physical server as the |application|.
For a test deployment, you can use a MongoDB standalone in place of a replica
set.

Each server that runs a dedicated MongoDB instance that hosts an
|application| database **must comply** with the :manual:`Production Notes
</administration/production-notes>` in the MongoDB manual.

Each server also requires the following:

.. list-table::
   :header-rows: 1

   * - **Number of Monitored Hosts**
     - **RAM**
     - **Disk Space**
   * - Up to 400 monitored hosts
     - 8 GB additional RAM beyond the RAM required for the |application|
     - 200 GB of storage space
   * - Up to 2000 monitored hosts
     - 15 GB additional RAM beyond the RAM required for the |application|
     - 500 GB of storage space
   * - More than 2000 hosts
     - Contact MongoDB account manager
     - Contact MongoDB account manager

For the best results use SSD-backed storage.
