.. _atlas_20210713:

13 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces the general availability of 
  :manual:`MongoDB 5.0 </release-notes/5.0/>`, which includes 
  support for:

  - Time Series collections,
  - Live Re-Sharding,
  - the Versioned |api|,
  - Client Side Field Level Encryption via |aws| |kms|, 
    Google Cloud |kms| and Azure Key Vault,
  - and more.

- Introduces 
  :ref:`serverless instances <create-new-serverless-instance>` as a new 
  database deployment option in |service|, available in preview.

- Introduces the general availability of the new 
  `MongoDB Shell <https://docs.mongodb.com/mongodb-shell/>`__.

- Updates the 
  `Atlas Uptime SLA <https://www.mongodb.com/cloud/atlas/sla>`__ 
  to apply to ``M10+`` clusters.

- Introduces :atlas:`MongoDB Atlas for Government </government>`, 
  approved as FedRAMP Ready for Agency Authorization in |aws| GovCloud 
  (US) and |aws| US East/West regions.

- Introduces the ability to 
  `deploy and Manage MongoDB Atlas from AWS CloudFormation <https://www.mongodb.com/blog/post/deploy-manage-mongodb-atlas-aws-cloud-formation?utm_campaign=cloudformation&utm_source=aws&utm_medium=public_registry_blog>`__ 
  using the newly generally available 
  `AWS CloudFormation Public Registry <https://aws.amazon.com/about-aws/whats-new/2021/06/announcing-a-new-public-registry-for-aws-cloudformation/>`__.

- Introduces new hardware-level metrics for Disk Queue Depth.

.. _atlas_20210623:

23 June 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Removes Personal API keys. Personal API Keys reached End of Life (EOL)
  on March 1, 2021. Communications sent beginning 2 years before this
  date notified users. We encourage you to use :ref:`Programmatic API Keys <about-org-api-keys>`.


.. _atlas_20210511:

11 May 2021 Release
~~~~~~~~~~~~~~~~~~~

- Introduces a search tester UI to run queries and see results  
  for :ref:`{+fts+} <fts-top-ref>`.
- Introduces |service| :ref:`Global Clusters <de-shard-collection-for-global-writes>`
  support for using a unique compound index as a shard key and using a
  compound shard with a hashed second field.
- Introduces the ability for :adl:`{+data-lake+} <>` to target cluster 
  :ref:`analytics nodes <deploy-analytics-nodes>` for federated queries.

.. _atlas_20210421:

21 April 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds more IOPS and more consistent throughput to standard storage for 
  |service| clusters on |aws| at no extra cost.
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
- |service| {+free-clusters+} (**M0**) and {+shared-clusters+} (**M2**/**M5**)
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
