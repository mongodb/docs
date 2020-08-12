.. include:: /images/backup-flow-wt.rst

1. When the cluster is ready for its scheduled snapshot, it determines
   an optimal available node to take the snapshot. In most cases, the
   |mongod| determines lowest priority secondary member as the
   preferred snapshot node. Other metrics can factor into determining
   the preferred node, such as how current the secondary is with the
   primary and the previously chosen snapshot's member.

#. Once the |mongod| process determines the origin node for the
   snapshot, the backup process opens a ``$backupCursor`` on the
   targeted node.

   The ``$backupCursor``, a storage engine layer mechanism, allows the
   database files in storage to be copied in a consistent state while
   still accepting writes.

   .. note::

      The Backup Module may back up one |mongod| process per MongoDB
      deployment per host at one time.

#. The {+mdbagent+} Backup function copies and processes these data
   files.

#. The {+mdbagent+} Backup function sends the data files to |mms|.

#. The backup process collects and transfers these files to the
   snapshot store that you choose to store your backup. Depending upon
   which snapshot store you chose to store your snapshot, a snapshot
   can be written out as:

   a. Blocks to a :term:`blockstore <Backup Blockstore Database>`.
      Binary chunks written to a MongoDB database on the |mms| host.

   #. Blocks to an :term:`AWS S3 bucket <S3 Snapshot Store>`. The
      metadata for those blocks is written to a MongoDB database on the
      |onprem| host.

   #. Snapshot files to a :term:`File System Store`.

.. note::

   To learn more about the characteristics of each storage method, see
   :ref:`backup-configuration-options`.
