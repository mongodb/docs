.. _atlas_20200218:

18 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports "Click-to-Create"
  :ref:`Index Suggestions in Performance Advisor <pa-create-suggested-indexes>`.
- Supports MongoDB 4.2 on |aws| using Cloud Provider Snapshots with
  Point-in-Time restores.
- Transitions customers with Continuous Backups automatically to Cloud
  Provider Snapshots when upgrading from 4.0 to 4.2.
- Increases maximum storage to memory ratio:

  .. list-table::
     :header-rows: 1
     :widths: 40 30 30

     * - Cluster Tiers
       - Old Max Storage Ratio
       - New Max Storage Ratio

     * - M10 - M40
       - 50:1
       - 60:1
     * - M50+ cluster tiers
       - 100:1
       - 120:1

- Starts port numbers from 1024 instead of 1 on Atlas Private Endpoints
  on |aws| cluster nodes.

**Starting week of 24 February:**

- Scales cluster to next cluster tier (from M30 to M40 for example) to
  continue storage scaling when the cluster:

  - Has enabled storage auto-scaling, and
  - Approaches the cluster tier’s maximum storage level

.. _atlas_20200204:

04 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports using Google authentication for MongoDB Cloud user login.
- Introduces :mdbacct:`account.mongodb.com </login>`: a
  unified login experience for MongoDB Cloud, Support, JIRA, and
  Feedback.

.. _atlas_20200128:

28 January 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Removes :ref:`Continuous Backup <backup-continuous>` as a backup
  option for new |aws|\-backed clusters. Newly deployed |aws|\-backed
  clusters use :ref:`Cloud Provider Snapshots <backup-cloud-provider>` for backup.

- Provides customers with :ref:`project-level maintenance windows
  <atlas-modify-project-settings>` enabled with ability to receive the
  72-hour alert notification in their configured alerts destination.

.. _atlas_20200107:

07 January 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Modifies behavior so that clusters enter a terminal state after
  customers revoke MongoDB |service| encryption keys that they manage
  with |aws| |kms|, |gcp| |kms|, or |azure| Key Vault.

- Provides ability to manage :ref:`{+aws-pl+} via API <private-endpoint-api>`.
