Snapshot Frequency and Retention Policy
+++++++++++++++++++++++++++++++++++++++

You can take snapshots every 6, 8, 12, or 24 hours and save them for 2-5
days. |mms| can retain daily snapshots for up to 365 days, weekly snapshots
for up to 52 weeks, and monthly snapshots for up to 36 months. By default,
|mms| uses the :ref:`retention policy described here
<configure-snapshot-retention>`.

.. only:: onprem

   Depending on how long your save 6-hour snapshots, you can set
   point-in-time restores going back 1, 2, 3, or 4 days.

Changes to the snapshot schedule will affect your snapshot storage costs. The
longer your snapshot window, the longer it will take to build a point in time
restore.

Excluded Namespaces
+++++++++++++++++++

Excluded namespaces are databases or collections that |mms| will not
back up. Exclude name spaces to prevent backing up collections that
contain logging data, caches, or other ephemeral data. By excluding
these kinds of databases and collections will allow you to reduce
backup time and costs.

Storage Engine
++++++++++++++

When you enable backups for a cluster or replica set, you choose the
storage engine for the backups. Your choices are the MongoDB default
``MMAPv1`` engine and the ``WiredTiger`` engine. For more information on
both, see :manual:`Storage </core/storage>` in the MongoDB manual.

You can choose a different storage engine for a backup than you do for the
original data. There is no requirement that the storage engine for a backup
match that of the data it replicates. If your original data uses ``MMAPv1``,
you can choose ``WiredTiger`` for backing up, and vice versa.

You can change the storage engine for a cluster or replica set's backups
at any time, but doing so requires an :term:`initial sync` of the backup
on the new engine.

If you choose the ``WiredTiger`` engine to back up a collection that
already uses ``WiredTiger``, the initial sync replicates all the
collection's ``WiredTiger`` options. For information on these options,
see the ``storage.wiredTiger.collectionConfig`` section of the
:manual:`Configuration File Options </reference/configuration-options>`
page in the MongoDB manual.

.. only:: onprem

   For collections created after initial sync, the Backup Daemon uses its
   own defaults for storing data. The Daemon will not replicate any
   ``WiredTiger`` options for a collection created after iniitial sync.

Index collection options are never replicated.
