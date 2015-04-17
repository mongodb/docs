The :ref:`mms-application-database` holds monitoring and other metadata
for the :ref:`mms-application-package`.

The database runs as a three-member :term:`replica set`. If you cannot
allocate space for three data-bearing members, the third member can be an
arbiter, but keep in mind that |mms| uses ``w:2`` :manual:`write concern
</reference/write-concern>`, which reports a write operation as successful
after acknowledgement from the primary and one secondary. If you use a replica
set with fewer than 3 data-bearing members, and if you lose one of the
data-bearing members, MongoDB blocks write operations, meaning the
:ref:`mms-application-database` has durability but not high availability.

Run the replica set on dedicated servers. You can optionally run one
member of the replica set on the same physical server as the |application|.

For a :doc:`test deployment </tutorial/install-simple-test-deployment>`,
you can use a MongoDB standalone in place of a replica set.

Each server that hosts a MongoDB process for the |application|
database **must** comply with the :manual:`Production Notes
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
