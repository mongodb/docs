.. _atlas_20211215:

15 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to 
  :ref:`link an AWS Billing Account to your MongoDB Atlas account <aws-self-serve-marketplace>`.

.. _atlas_20211202:

2 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to assign a
  :manual:`built-in role </reference/built-in-roles/>`, multiple
  :ref:`custom roles <mongodb-roles>`, and multiple specific privileges
  to a single database user.
- Introduces a new specific privilege, :ref:`killOpSession <atlas-specific-privileges>`.
- Adds the ability to
  :doc:`revoke temporary infrastructure access to MongoDB Support </security-restrict-support-access/>`.
- Changes the :ref:`default recipients for billing alerts <atlas-billing-profile>`
  if you don't provide a billing email address.

.. _atlas_20211117:

17 November 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for Google Private Service with
  :doc:`Atlas Private Endpoints </security-private-endpoint/>`
  via the console.
- Introduces the ability to :doc:`export backup snapshots </backup/cloud-backup/export/>`
  to their own Amazon |s3| buckets on-demand via the |api|.
- Adds support for time-series collections for Atlas Online Archive.

.. _atlas_20211111:

11 November 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for :manual:`MongoDB 5.1 </../v5.1/reference/versioning/#rapid-releases>`.

.. _atlas_20211027:

27 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports the use of Security Key and Biometrics as a 
  :ref:`multi-factor authentication <atlas-enable-mfa>` option.
- Supports :manual:`zstd </reference/glossary/#std-term-zstd>` as a 
  compression standard for clusters on MongoDB 4.2 and later.

.. _atlas_20211018:

18 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports ``M0`` {+free-clusters+} and ``M2/M5`` {+shared-clusters+}
  in the following regions:

  - AWS Tokyo (``ap-northeast-1``)
  - AWS Stockholm (``eu-north-1``)
  - AWS Bahrain (``me-south-1``)
  - Google Cloud Jakarta (``asia-southeast2``)
  - Google Cloud Seoul (``asia-northeast3``)
  
- Supports increased throughput for 4 TB volumes on Azure. The following
  |service| {+clusters+} deployed to Azure now offer 16,000 IOPS (up
  from 7,500) and 500 MB/second throughput (up from 250 MB/second):

  - New {+clusters+} with 4 TB storage volumes.
  - Existing {+clusters+} that you scale up to 4 TB storage volumes.

.. _atlas_20211006:

06 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports Google Private Service with |service| Private Endpoints via 
  the API.

- Supports the following GCP regions:
  
  - ``asia-south2`` (Delhi, India)
  - ``australia-southeast2`` (Melbourne, Australia)
  - ``europe-central2`` (Warsaw, Poland)

- Adds support for :ref:`cluster tier auto-scaling <cluster-autoscaling>`
  to low-CPU class clusters.

- Enables :ref:`cluster tier auto-scaling <cluster-autoscaling>` by
  default for all new |service| clusters created via the web interface.

- Supports using :ref:`Live Migration from Ops Manager or Cloud Manager <migrate-from-com>`
  for MongoDB deployments running MongoDB 5.0.

- Introduces metrics alerts for |service| serverless instances.

- For :ref:`Cross-Organization Billing <cross-org-billing>` customers, 
  |service| now allocates subscription charges across all linked 
  organizations in proportion to spend.

.. _atlas_20210915:

15 September 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports Osaka, Japan (ap-northeast-3) AWS region. 

- Introduces serverless instances into additional GCP regions:
  
  - Iowa (CENTRAL_US)
  - Belgium (WESTERN_EUROPE)

- Introduces serverless instances into additional AWS regions:

  - Oregon (US_WEST_2)
  - Mumbai (AP_SOUTH_1)
  - Sydney (AP_SOUTHEAST_2)

- Adds 10 second granularity cluster metrics for all dedicated clusters 
  in projects with at least one ``M40+`` cluster.
- Adds support for time series collections in Data Explorer and Query 
  Profiler.
- Introduces the ability to create new time series collections and 
  build secondary indexes from the :abbr:`UI (User Interface)`.
- Introduces the ability to visualize slow queries in times series 
  collections.
- Introduces the ability to deploy ``M0`` {+free-clusters+} using the
  :ref:`create-one-cluster-ref`  and :ref:`create-one-advanced-cluster-ref`
  endpoints.

.. _atlas_20210824:

25 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Introduces {+serverless-instances+} into the following Azure regions:

  - Virginia (US_EAST_2)
  - Netherlands (EUROPE_WEST)

- Adds metrics that report maximum observed values, in 60-second 
  intervals, for all hardware metrics.
- Adds the ability to specify :manual:`Sort 
  </reference/method/cursor.sort/>`, :manual:`Project
  </tutorial/project-fields-from-query-results>`, and :manual:`Collation
  </reference/collation/>` query options when you :ref:`query your data
  <de-view-documents>` using :guilabel:`Data Explorer`.
- Adds the ability for a user with the 
  :authrole:`Project Cluster Manager` role to :ref:`test-failover-api`.

.. _atlas_20210803:

03 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Increases the maximum number of provisioned IOPS for clusters 
  ``M140`` and up on |aws| to 64,000 IOPS.

- Introduces :ref:`embedded data visualizations <billing_visualizations>` 
  on the Billing Overview page and within each invoice.

- Lowers data transfer rates within the following |aws| regions:

  - Tokyo
  - Sydney 
  - Bahrain
  - São Paulo

- Spreads newly deployed clusters in the South Central US |azure| 
  region across three availability zones.

- Introduces the ability to set an |service| user account to be granted 
  the :authrole:`Project Owner` role on a specified project 
  :ref:`via the API <atlas-create-one-project-api>`.

- Removes IP Whitelist resources. The 
  :ref:`IP Access List <security-access-list>` resource replaces the 
  whitelist resource. We encourage you to update your applications to 
  use this new resource.

- Removes the API Key Whitelist endpoints. The 
  :ref:`API Key Access List <api-key-access-list-api>` endpoints 
  replace the whitelist endpoints. We encourage you to update your 
  applications to use these new endpoints.

- Introduces email verification for all new |service| user 
  registrations.

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
  `MongoDB Shell <https://www.mongodb.com/docs/mongodb-shell/>`__.

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
  <https://www.mongodb.com/docs/mongocli/stable/quick-start/#configure-an-service-cluster>`__ 
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
- Adds the ability to proactively change a cluster's TLS certificate 
  root CA in order to test readiness ahead of the Let's Encrypt planned 
  root CA change from IdenTrust to ISRG. All |service| clusters' 
  certificates will be migrated to the ISRG root CA between May and 
  September of this year.

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
