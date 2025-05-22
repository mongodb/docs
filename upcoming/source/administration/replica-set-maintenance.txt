.. _replica-set-maintenance-tutorials:

==============================================
Self-Managed Replica Set Maintenance Tutorials
==============================================

.. meta::
   :description: Explore tutorials for maintaining replica sets, including oplog size adjustment, member synchronization, and configuration updates.

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

The following tutorials provide information in maintaining existing
replica sets.

:doc:`/tutorial/change-oplog-size`
   Increase the size of the :term:`oplog` which logs operations. In
   most cases, the default oplog size is sufficient.

:doc:`/tutorial/perform-maintence-on-replica-set-members`
   Perform maintenance on a member of a replica set while minimizing
   downtime.

:doc:`/tutorial/force-member-to-be-primary`
   Force a replica set member to become primary.

:doc:`/tutorial/resync-replica-set-member`
   Sync the data on a member. Either perform initial sync on a new
   member or resync the data on an existing member that has fallen
   too far behind to catch up by way of normal replication.

:doc:`/tutorial/configure-replica-set-tag-sets`
   Assign tags to replica set members for use in targeting read and
   write operations to specific members.

:doc:`/tutorial/reconfigure-replica-set-with-unavailable-members`
   Reconfigure a replica set when a majority of replica set members
   are down or unreachable.

:doc:`/tutorial/manage-chained-replication`
   Disable or enable chained replication. Chained replication occurs
   when a secondary replicates from another secondary instead of the
   primary.

:doc:`/tutorial/change-hostnames-in-a-replica-set`
   Update the replica set configuration to reflect changes in
   members' hostnames.

:doc:`/tutorial/configure-replica-set-secondary-sync-target`
   Specify the member that a secondary member synchronizes from.

:doc:`/tutorial/rename-unsharded-replica-set`
  Rename an unsharded replica set.

:doc:`/tutorial/modify-psa-replica-set-safely`
  Safely perform some reconfiguration changes on a
  primary-secondary-arbiter (PSA) replica set or on a replica set that
  is changing to a PSA architecture.

:doc:`/tutorial/mitigate-psa-performance-issues`
  Reduce cache pressure and increased write traffic for a deployment
  that has a three-member primary-secondary-arbiter (PSA) architecture.

.. toctree::
   :titlesonly:
   :hidden:

   Change Oplog Size </tutorial/change-oplog-size>
   Maintain Member </tutorial/perform-maintence-on-replica-set-members>
   Force a Primary </tutorial/force-member-to-be-primary>
   Resync a Member </tutorial/resync-replica-set-member>
   Configure Unavailable Members </tutorial/reconfigure-replica-set-with-unavailable-members>
   Self-Managed Chained Replication </tutorial/manage-chained-replication>
   Change Hostname </tutorial/change-hostnames-in-a-replica-set>
   Configure Sync Target </tutorial/configure-replica-set-secondary-sync-target>
   Rename </tutorial/rename-unsharded-replica-set>
   Modify PSA </tutorial/modify-psa-replica-set-safely>
   Mitigate Performance </tutorial/mitigate-psa-performance-issues>
