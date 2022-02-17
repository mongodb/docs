The :ref:`Backup Daemon <backup-daemon>` maintains copies of the data
from your backed up :program:`mongod` instances and creates snapshots
used for restoring data. The file system that the Backup Daemon uses
must have sufficient disk space and write capacity to store the backed
up instances.

For replica sets, the local copy is equivalent to an additional
secondary replica set member. For sharded clusters the daemon maintains
a local copy of each shard as well as a copy of the
:term:`config database`.

To configure high availability:

- Use multiple :ref:`backup daemons <backup-daemon>` to scale
  your deployment horizontally.

- Add backup daemons dedicated to queryable restore jobs.

- Add backup daemons dedicated to restore jobs.

- Deploy your backing databases in
  :term:`replica sets <replica set>` to provide
  :manual:`failover </core/replica-set-high-availability>`.

.. _multiple-backup-daemons:

Multiple Backup Daemons
-----------------------

You need multiple backup daemons for queryable restore only.

To increase your storage and to scale horizontally, you can run
multiple instances of the :term:`Backup Daemon`. Increase the available
storage for the :term:`head databases <head database>` to provide
scalability. This does not increase the available space for snapshot
storage.

With multiple daemons, you can choose which Backup Daemon, Sync Store,
Oplog Store, Snapshot Store, and Assignment Labels to bind to a
specific group. If you do not choose specific daemons and stores, |mms|
uses all available backup components for each group.

For a tutorial on how to assign Backup Jobs to Backup Daemons,
see :doc:`/tutorial/assign-snapshot-stores-to-data-center`.

Multiple Backup Daemons allow for **manual** failover should one daemon
become unavailable. You can instruct |mms| to transfer the daemon's
backup responsibilities to another Backup Daemon. |mms| reconstructs
the data on the new daemon's server and binds the associated replica
sets or shards to the new daemon. To learn how this process works, see
:doc:`/tutorial/move-jobs-to-new-backup-daemon`.

|mms| reconstructs the data using a snapshot and the oplog from the
:ref:`backup-database`.

The Backup Daemon is installed with |onprem| package but must be
specifically activated to run. Select the procedure specific to your
platform on the :doc:`/installation` section.

Replica Sets for Backing Databases
----------------------------------

Deploy :term:`replica sets <replica set>` rather than standalones for
the :doc:`dedicated MongoDB processes </tutorial/prepare-backing-mongodb-instances>`
that host the |application| and Backup Databases. Replica sets provide
:manual:`automatic failover </core/replica-set-high-availability>`
should the :term:`primary` become unavailable.

When deploying a replica set with members in multiple facilities,
ensure that a single facility has enough votes to elect a
:term:`primary` if needed. When choosing between facilities for this
single facility, choose the facility that hosts the |application| and
application database. Place a majority of voting members and all the
members that can become primary in this facility. Otherwise, network
partitions could prevent the set from being able to form a majority.

.. seealso::

   - For details on how replica sets elect primaries, see
     :manual:`Replica Set Elections </core/replica-set-elections>`.

   - To deploy a replica set, see :manual:`Deploy a Replica Set
     </tutorial/deploy-replica-set>`.

.. _restore-dedicated-query:

Dedicated Queryable Daemons
---------------------------

To configure dedicated queryable daemons, adjust the settings per
backup daemon on the :guilabel:`Daemon` :ref:`configuration
<daemons-interface>` page. For the dedicated queryable daemon host,
clear all checkboxes except :guilabel:`Queryable Restore Jobs`.

.. _restore-dedicated-restore:

Dedicated Restore Daemons
-------------------------

To decrease restore times or if you have multiple backup jobs per
daemon, add dedicated restore daemons. To configure dedicated restore
daemons, adjust the settings per backup daemon on the
:guilabel:`Daemon` :ref:`configuration <daemons-interface>` page.

For the dedicated restore daemon host, clear the following checkboxes:

- :guilabel:`Resource Usage`
- :guilabel:`Garbage Collection`

Consider adding the ``mms.backupRestoreCentralUrl`` custom setting to
point to the |http| service running on the dedicated restore daemon
host so that dedicated host serves the snapshot data. To add this
setting, go to the :guilabel:`Custom` tab in the
:guilabel:`Ops Manager Config` and add the custom setting.

Additional Information
----------------------

To move jobs from a lost Backup server to another Backup server, see
:doc:`/tutorial/move-jobs-to-new-backup-daemon`.

To learn how to make |application| highly available, see
:doc:`/tutorial/configure-application-high-availability`.
