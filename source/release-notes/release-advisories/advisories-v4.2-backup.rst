Backup Features Supported at Present
````````````````````````````````````

.. list-table::
   :widths: 40 30 30
   :header-rows: 1

   * - Feature
     - Databases running FCV 4.2 and later
     - Databases running FCV 4.0 and earlier

   * - Backs up Data using WiredTiger Snapshots
     - :icon:`check-circle`
     -
   * - Backs up Data using the Backup Daemon
     - 
     - :icon:`check-circle`
   * - Backs up Replica Sets
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Backs up Sharded Clusters
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Can Filter using Namespaces [#]_
     -
     - :icon:`check-circle`
   * - Can Specify Sync Source Database
     -
     - :icon:`check-circle`
   * - Can Restore Data to Specific Point in Time [#]_
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Can Perform Incremental Backups [#]_
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Snapshots that use |kmip| Encryption [#]_
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Snapshots that use Local Key Encryption [#]_
     -
     - :icon:`check-circle`
   * - Supports Saving to blockstore snapshot storage
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Saving to |s3| Snapshot Storage
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Saving to File System Storage [#]_
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Databases running MongoDB Enterprise
     - :icon:`check-circle`
     - :icon:`check-circle`
   * - Supports Databases running MongoDB Community
     -
     - :icon:`check-circle`
   * - Requires a MongoDB Agent with
       :ref:`backup enabled <activate-backup>` on every |mongod|
       cluster node
     - :icon:`check-circle`
     -

.. [#] Namespace filtering is supported only for |mms| versions 
       6.0.8 and later. Your MongoDB deployments must have 
       ``featureCompatibilityVersion`` values of ``4.0`` and earlier, 
       or ``6.0.1`` and later.

.. [#] Performing a |pit| restore requires |onprem| 4.2.13 or later.

.. [#] |mms| requires a full backup for your first backup, after a
    snapshot has been deleted, and if the blockstore block size has
    been changed. Incremental backups reduce network transfer and
    storage costs.

    This feature works with:

    - MongoDB 4.0 and earlier.
    - MongoDB 4.2.6 or later if running |fcv-link| 4.2 or later.

.. [#] Querying an encrypted snapshot requires
       :product:`MongoDB Enterprise <enterprise>` 4.2.9 and later
       or 4.4.0 and later.

.. [#] |fcv-link| 4.2 and later backups don't support
       :ref:`local key encryption <encrypt-local-key-mgmt>`.

.. [#] Backups to a |fcv-link| 4.2 or later database to a File
       System Store ignore
       :setting:`File System Store Gzip Compression Level`.

Requirements and Limitations
````````````````````````````

To run backups and restores if you are running MongoDB 4.2 or later
with |fcv-link| 4.2 or later, you:

- Must run :product:`MongoDB Enterprise <enterprise>`.

- Must account for the change in blockstore block size. If you
  didn't set your block size and used the default, that block size
  changes from 64 KB to 1 MB. This can impact storage usage.

- Must ensure the hostnames in your replica set configuration match 
  the hostnames that the {+mdbagent+} uses, or that your 
  :ref:`host mappings <host-map>` contain the correct hostnames. You 
  can use :manual:`rs.conf() </reference/method/rs.conf>` to verify 
  your replica set configuration. 

- Can use namespace filter lists to define the
  :manual:`namespaces  </reference/glossary/#std-term-namespace>` included in a backup only if you are
  running MongoDB 6.0 or later. Snapshots taken on versions MongoDB 4.2
  through 5.0 always include all namespaces.

- Don't need a sync source database. When taking a Snapshot, |mms|
  selects the replica set member with the least performance impact
  and greatest storage-level duplication of Snapshot data.

- Must deploy a MongoDB Agent with every |mongod| node in
  the cluster.

.. note::

   If |mms| doesn't manage your cluster:

   - :ref:`Grant <edit-security-credentials>` the
     :authrole:`backup` and :authrole:`clusterAdmin` roles to the
     MongoDB user that runs backups.
   - Ensure that the operating system user that runs the {+mdbagent+}
     has read permission for all data files (including journal files)
     of the deployment.
