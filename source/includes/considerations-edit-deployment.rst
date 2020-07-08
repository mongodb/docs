Apply Changes to Cluster or Member
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you make configuration changes to an individual MongoDB
process within a cluster, any future changes to the cluster no longer apply to the child process.

.. example::

   If you turn off journaling for a replica set member and
   then later change the journal commit interval for the
   replica set, the change does not apply to the member.

MongoDB Version
~~~~~~~~~~~~~~~

To choose which versions of MongoDB are available to |mms|, see
:doc:`/tutorial/configure-available-mongodb-version`.

.. include:: /includes/considerations-change-mongodb-version.rst

Backup Considerations for MongoDB 4.2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:doc:`Backup </tutorial/nav/backup-deployments/>` support for MongoDB
4.2 with ``"featureCompatibilityVersion" : 4.2`` is extremely limited
at present. Support will be extended in future releases of |mms|.

To learn more about backup considerations specific to MongoDB 4.2, see
:ref:`4.2-backup-considerations`.

.. cond:: cloud

   If you choose to upgrade to MongoDB 4.2 with
   ``"featureCompatibilityVersion" : 4.2``, |mms| displays a modal that
   asks you to agree to the
   :doc:`special license </reference/legal/cloud-manager-backup-license>`
   that MongoDB, Inc. grants to use MongoDB Enterprise for backups.

Storage Engine
~~~~~~~~~~~~~~

.. important::

   .. include:: /includes/fact-mmapv1-deprecated.rst

If you run or upgrade to MongoDB 3.0 or later and modify the MongoDB
storage engine, |mms| shuts down and restarts the MongoDB process. For
a multi-member replica set, |mms| performs a rolling
:term:`initial sync` of each member.

|mms| creates backup directories during the migration from one storage
engine to the other if the host has adequate disk space. If disk space
is insufficient, no backups are taken. |mms| *does not* delete the
backup directories once the migration is complete. You can keep or
delete the previous backup directories. The backup directories are
located in  the :program:`mongod`'s data directory.

.. example::

   If the data directory was ``/data/process``, the backup would be
   ``/data/process.bak.UNIQUENAME``. The ``UNIQUENAME`` is a random
   string that |mms| generates.

Before you can change the :term:`storage engine` for a standalone
instance or replica set, you must give the {+aagent+} write access to
the MongoDB :term:`data directory`'s *parent* directory. The agent
creates a temporary backup of the data in parent directory when
updating the storage engine.

You cannot change the storage engine on a :term:`config server`. For
more information on storage engines and the available options, see
:manual:`Storage </core/storage>` in the MongoDB manual.

Fixed Properties
~~~~~~~~~~~~~~~~

You cannot modify the following settings after a deployment has been
created:

- :option:`database path <mongod.--dbpath>`
- The hostname, :option:`bind_ip <mongod.--bind_ip>` or
  :option:`port <mongod.--port>` to which a MongoDB process is
  assigned

You *can* modify the following deployment settings:

- :option:`log path <mongod.--logpath>` at the process level
- :doc:`advanced options </reference/deployment-advanced-options>`

Deployment Topology
~~~~~~~~~~~~~~~~~~~

You can make modifications at all levels of a deployment's topology,
including child processes.

To modify the topology or processes, use this tutorial or one of the
more specific tutorials:

- :doc:`/tutorial/migrate-member-to-new-hardware`
- :doc:`/tutorial/convert-standalone-to-replica-set`

Project-Level Modifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some modifications that affect a deployment occur at the project level.
The following changes affect every MongoDB process in the project. For
these changes, use the specified tutorials:

- To enable |tls| for the deployment, see
  :doc:`/tutorial/enable-ssl-for-a-deployment`.

- To enable authentication for the deployment, see
  :doc:`/tutorial/nav/security-enable-authentication`.

- To add or modify MongoDB users and roles for the deployment, see
  :doc:`/tutorial/manage-mongodb-users`.

Multiple Modifications
~~~~~~~~~~~~~~~~~~~~~~

You can combine multiple modifications into one deployment.

.. example::
   You could make all the following modifications before clicking the
   :guilabel:`Review Changes` button:

   - Add the latest stable version of MongoDB to the
     :ref:`version-manager`.

   - Enable |tls| for the deployment's MongoDB processes.

   - Add a new sharded cluster running the latest stable version of
     MongoDB from above.

When you click :guilabel:`Review Changes`, the review displays all the
changes on one screen for you to confirm before deploying.

.. _mms-force-reconfigure-ui:

Force Reconfigure
~~~~~~~~~~~~~~~~~

*For Replica Sets and Sharded Clusters Only*

The {+mdbagent+} can force a replica set to accept a new configuration
when you set the :guilabel:`Force Reconfigure` Replication Setting to
``Yes``. Only force a reconfiguration to recover a replica set from a
state in which a minority of its members are available.

.. include:: /includes/admonitions/warning/force-reconfigure-rollback.rst

.. seealso:: :manual:`Reconfigure a Replica Set with Unavailable Members </tutorial/reconfigure-replica-set-with-unavailable-members/>` in the MongoDB Manual.
