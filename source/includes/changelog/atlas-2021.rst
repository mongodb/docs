.. _atlas_20210421:

21 April 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds more IOPS and more consistent throughput to standard storage for 
  |service| clusters on |aws| at no extra cost.
- Supports using |charts| with :ref:`multi-cloud clusters 
  <create-cluster-multi-region>`.
- Introduces trial version of the :ref:`MongoDB Atlas Kubernetes 
  Operator <ak8so-quick-start-ref>`.
- Adds an easy `MongoDB CLI quickstart command
  <https://docs.mongodb.com/mongocli/stable/quick-start/#configure-an-service-cluster>`__ 
  to get started with |service|.

.. _atlas_20210330:

30 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports using :realm:`{+MongoDB-Realm+} </>` in multi-cloud clusters.

.. _atlas_20210309:

09 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces a new {+data-lake+}
  :adl:`onboarding experience </tutorial/getting-started/>`.
- Adds |api| support for multi-cloud clusters.
- Incorporates database and collection name drop-down menus
  in the {+fts+} :ref:`index builder <fts-tutorial-ref>`.
- Supports recommendations to remove redundant indexes in
  :ref:`performance-advisor`.
- Adds alert options for Disk IOPS and Disk Latency on Atlas.
- Disables the ability to deploy new MongoDB 3.6 clusters.
- Adds the ability to proactively change a cluster's
  :ref:`TLS certificate root CA <config-tls-cert-root>` in order to
  test readiness ahead of the Let's Encrypt planned root CA change from
  IdenTrust to ISRG. All |service| clusters' certificates will be
  migrated to the ISRG root CA between May and September of this year.

.. _atlas_20210217:

17 February 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces additional Asia Pacific Live Migrations regions in
  Singapore, Mumbai, and Tokyo.
- Makes the M400 |nvme| cluster tier available in all major |aws|
  regions.
- Enhances Maintenance Windows:

  - Can auto-defer maintenance by one week.
  - Displays the current and target maintenance database version when
    maintenance includes a version upgrade.

- Spreads newly deployed clusters in the following Azure regions across
  three availability zones:

  - Germany West Central
  - South Africa North
  - Australia East

- Supports cluster tier auto-scaling for multi-cloud clusters.
- Improves Data Explorer load times.

.. _atlas_20210126:

26 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Introduces private network access for :ref:`multi-cloud clusters
  <create-cluster-multi-region>`.
- |service| free- (**M0**) and shared-tier (**M2**/**M5**) clusters
  upgraded to MongoDB 4.4.
- Defaults new clusters to MongoDB 4.4.
- Introduces custom archiving rules for |service| :ref:`Online Archive
  <manage-online-archive>`.
- Introduces the ability to use an |aws| |iam| role to authorize
  |service| to access:
  - |aws| |kms| encryption keys for customer key management, or
  - |s3| buckets for {+data-lake+}\s.
- Introduces the ability to peer to |service| VPCs on |gcp| with a
  smaller |cidr| block. When you create the network peering container
  using the |service| :ref:`API <atlas-create-peering-container-api>`,
  you can specify a |cidr| block between ``/21`` and ``/24``, inclusive,
  insead of the default, ``/18``.
- Adds the ability to specify an |aws| |arn| with a compound path when
  you create an |aws| IAM-authenticated :ref:`database user
  <mongodb-users>`.

.. _atlas_20210106:

06 January 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Changes the cluster-level navigation UI so that |fts| is now a top
  level tab.
- Introduces a visual editor for :ref:`creating <ref-create-index>`
  an |fts| index.
- Allows users of the |bic| to download |bic-short| logs.
