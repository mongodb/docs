.. include:: /images/backup-flow.rst

#. The Backup-enabled {+mdbagent+} connects to, and authenticates with,
   the databases associated with the backup job.

#. The :term:`initial sync` begins and enters its ``starting`` phase.
   Initial sync is a transition state between :guilabel:`Inactive` and
   :guilabel:`Active`. Initial Sync goes through a series of phases
   that are displayed on the :guilabel:`Backup` page to show progress.
   {+bagent+} streams the existing data to |onprem| in 10 MB
   compressed bundles of documents called slices. {+bagent+}
   creates slices at the point in time when the snapshot was created.
   |mms| captures data inserted to the instance once the snapshot
   starts separately.

#. The ``transferring`` phase begins as the slices are streamed and
   stored in the :term:`Oplog Store <Oplog Store Database>` temporarily
   on the Backup Daemon's behalf. The Backup Daemon service cannot
   dedicate itself to processing the large stream of initial sync
   slices at the expense of processing other backup jobs. The Oplog
   Store stores the slices until the Backup Daemon can fetch them. The
   Oplog Store is created when the first :term:`Snapshot Store` is
   created.

#. While {+bagent+} is streaming the data, it tails the :term:`oplog`.
   This tailing collects any differences between the state of the
   deployment database when the backup began and the deployment
   database's current state. The oplog entries are sent in 10 MB
   compressed bundles of documents called :term:`oplog slices <oplog
   slice>`. These two streams of slices are collected in parallel to
   reduce the time needed to construct a complete snapshot.

#. The ``building`` phase begins once |onprem| receives the first batch
   of initial sync slices. In this phase, |onprem| creates a local
   version of the backed up database called a :term:`head database` on
   the host running the Backup Daemon service.

#. |onprem| uses the Backup Daemon service to insert the documents
   stored in the Oplog Store into the head database.

#. The ``applying oplogs`` phase begins as |onprem| applies the
   tailed oplog entries into the head database.

#. During the ``fetching missing documents`` phase, |onprem| queries
   the deployment database for documents missed during document
   insertion. |onprem| inserts the missing documents found in the
   deployment database into the head database.

#. After inserting the missing documents, the ``creating indexes``
   phase begins as |onprem| creates all of the indexes found in the
   deployment databases in the head database. When the indexes finish,
   the initial sync ends and the phase changes to ``complete``.

#. Depending upon which snapshot store you chose to store your
   snapshot, a snapshot can be written out as:

   a. Blocks to a :term:`blockstore <backup blockstore database>`.

   #. Blocks to an :term:`AWS S3 bucket <S3 snapshot store>`. The
      metadata for those blocks is written to a MongoDB database on the
      |onprem| host.

   #. Snapshot files to a :term:`file system store`.

.. note::
   The characteristics of each storage method is covered in
   :ref:`backup-configuration-options`.
