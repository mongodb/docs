.. _atlas_20201013:

13 October 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports |azure| Private Link with |service| :doc:`Private Endpoints
  </reference/api/private-endpoints/>`.
- Improved filtering for the :doc:`Activity Feed </tutorial/activity-feed/>`.
- Optimizes :doc:`slow query logging </performance-advisor/>` by automatically
  adjusting the slowMS threshold based on the workload to capture more
  slow queries.
- Introduces a feedback button for Index Suggestions in the :doc:`Performance
  Advisor </performance-advisor/>`.

.. _atlas_20200922:

22 September 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports the following |aws| :doc:`regions </reference/amazon-aws>`:

  - ``af-south-1`` (Cape Town, South Africa)
  - ``eu-south-1`` (Milan, Italy)

- Supports the following |gcp| :doc:`regions </reference/google-gcp>`:

  - ``asia-southeast2`` (Jakarta, Indonesia)
  - ``uswest3`` (Las Vegas, NV, USA)
  - ``uswest4`` (Salt Lake City, UT, USA)

- Supports the following |azure|
  :doc:`regions </reference/microsoft-azure>`:

  - ``westcentralus`` (Wyoming, USA)
  - ``germanynorth`` (Berlin, Germany)

- Updates terminology for Atlas cluster firewall management. Introduces
  :doc:`IP Access List </security/ip-access-list>` and deprecates "IP
  Whitelist".

- Introduces new host-level monitoring metrics for total memory, total
  memory free and total swap used.

.. _atlas_20200901:

01 September 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Reduces cluster pricing and introduces new storage options for
  |service| on Azure:

  - M10 clusters include 8 GB of storage
  - M20 clusters include 16 GB of storage
  - M40 clusters include 64 GB of storage

- Allows you to scope database users to one or more specific clusters
  and |data-lake|\s in an |service| project.

|service| |data-lake|
`````````````````````

Introduces easier authorization management for S3 access:

- Provides a centralized UI to authorize and view |aws| |iam| roles and
  associated |data-lake|\s under the |service|
  :guilabel:`Project Integrations`.

- Allows you to re-use an existing |aws| |iam| role when granting
  access to a new |service| |data-lake|.

.. _atlas_20200811:

12 August 2020 Release
~~~~~~~~~~~~~~~~~~~~~~

- Enhances
  :ref:`Performance Advisor and Query Profiler <performance-advisor>`
  with higher volume log ingestion.
- Improves user experience with the
  :ref:`Real Time Performance Panel <real-time-metrics-status-tab>`,
  including one-minute history views.
- Introduces predefined ``getLastErrorModes`` to enable multi-region
  write concern.

.. _atlas_20200730:

30 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces general availability of MongoDB 4.4.

.. _atlas_20200721:

21 July 2020 Release
~~~~~~~~~~~~~~~~~~~~

- :ref:`Cloud Backups <backup-cloud-provider>` on Azure now use incremental
  snapshots.
- Introduces :ref:`Low-CPU Cluster Tiers <storage-class-ui>` on Azure.

.. _atlas_20200624:

24 June 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces alerts for 
  :ref:`Performance Advisor <performance-advisor>` recommendations.

.. _atlas_20200602:

02 June 2020 Release
~~~~~~~~~~~~~~~~~~~~

- Renames :ref:`"Cloud Provider Snapshots" <backup-cloud-provider>` to
  "Cloud Backup".

- Renames :ref:`"Cloud Provider Snapshots with Point in Time Restore"
  <pit-restore>` to "Continuous Cloud Backup".

- Introduces Low-CPU :ref:`Cluster Tiers <create-cluster-instance>` on |gcp|
  in select regions.

.. _atlas_20200512:

12 May 2020 Release
~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`Cross-Org Billing <cross-org-billing>` for customers
  on annual subscriptions.

- Changes default for new Atlas cluster deployments to |tls| 1.2
  from |tls| 1.1.

- Adds Atlas Search support for geospatial search queries and
  autocomplete features.

.. _atlas_20200422:

22 April 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Redesigns the MongoDB Cloud navigation.
- Introduces :doc:`schema suggestions </performance-advisor/schema-suggestions>`
  in Performance Advisor and Data Explorer.
- Reduces the price of |nvme| storage for |aws| clusters.
- Supports the following
  :ref:`advanced federation options <fed-auth-advanced>` for customers
  who use |saml|\-based single sign-on:

  - Restrict organization membership
  - Restrict access by domain
  - Bypass single sign-on

- Removes legacy {+Old-Backup+} as an option for new |gcp|\- and
  |azure|\-backed clusters. New |gcp|\- and |azure|\-backed clusters
  use :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>` for
  backup.

.. _atlas_20200331:

31 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports :doc:`multiple connection strings </reference/faq/connection-changes>` to the same cluster:

  - Supports deploying a multi-region |service| cluster on |azure| and
    connecting to it using VNet peering.

  - Supports using |realm-docs| to connect to an |service| cluster
    that uses |vpc| peering on |gcp| or VNet peering on Azure.

  - Supports using |charts| to connect to an |service| cluster that
    uses |vpc| peering on |gcp| or VNet peering on Azure.

  - Supports using Live Migration to migrate to an |service| cluster
    where |vpc| peering on GCP or VNet peering on Azure is enabled.

  - Supports connecting from public IP using a special connection
    string to an |service| cluster on |gcp| or Azure that is using
    peering.

  - Supports connecting to an |service| cluster over an |aws| |vpc|
    peering connection where you use a custom |dns| provider (and
    |aws|\'s built in split horizon |dns| cannot be used) and a special
    connection string for private IP.

- Supports M0 Free Tier and M2/M5 shared starter clusters in the |gcp|
  Mumbai region.

.. _atlas_20200319:

19 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- ``M10`` and ``M20`` cluster tiers now support :ref:`Atlas Search
  <fts-top-ref>`. All cluster tiers running MongoDB version 4.2 and
  higher can use Atlas Search.

.. _atlas_20200310:

10 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports the |gcp| Seoul region.

- Supports the following |azure| regions:

  - Azure Norway East
  - Azure Switzerland West: This non-standard Azure region should be
    used as a secondary disaster recovery region for Switzerland North.
  - Azure UAE Central: This non-standard Azure region should be used
    secondary disaster recovery region for UAE North.

- Supports :ref:`{+PIT-Restore+}s <pit-restore>` for |gcp| and
  Azure backups.
- Defaults new clusters to MongoDB 4.2.
- Displays a review change modal to users after making edits to a
  cluster.

.. _atlas_20200218:

18 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports "Click-to-Create"
  :ref:`Index Suggestions in Performance Advisor <pa-create-suggested-indexes>`.
- Supports MongoDB 4.2 on |aws| using {+Cloud-Backup+}s with
  {+PIT-Restore+} restores.
- Transitions customers with {+Old-Backup+}s automatically to {+Cloud-Backup+}s when upgrading from 4.0 to 4.2.
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

- Increases number of connections to M10 and M20 tiers.

  .. list-table::
     :header-rows: 1
     :widths: 40 30 30

     * - Cluster Tiers
       - Old Connections
       - New Connections

     * - M10
       - 750
       - 1,500
     * - M20
       - 1,500
       - 3,000

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

- Removes :ref:`{+Old-Backup+} <legacy-backup>` as a backup
  option for new |aws|\-backed clusters. Newly deployed |aws|\-backed
  clusters use :ref:`{+Cloud-Backup+}s <backup-cloud-provider>` for backup.

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
