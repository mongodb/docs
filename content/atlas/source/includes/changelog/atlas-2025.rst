.. _atlas_2025_12_05:

05 December 2025 Release 
------------------------

- Deprecates :ref:`$search.tracking <fts-tracking-ref>` and :ref:`Query
  Analytics UI <fts-query-analytics>`. The official end-of-life and
  complete removal of support will occur in February 2026. Therefore,
  |service| will no longer collect query data for display in the
  {+atlas-ui+} for all ``$search.tracking`` requests. If you have any
  questions or need further assistance, reach out to our support team
  from the MongoDB Support Portal or contact your Account Executive. 

.. _atlas_2025_11_19:

19 November 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for deploying {+service+} clusters on {+aws+} regions
  ``ap-east-2`` and ``ap-southeast-6``, and {+azure+} regions
  ``chilecentral``, ``indonesiacentral``, and ``malaysiawest``.
  
- Reduces the inactivity policy for pausing inactive |service| ``M0`` {+Free-clusters+} 
  from 60 to 30 days. You'll receive an email notification 7 days before {+service+} 
  pauses your cluster. To resume a paused cluster, see :ref:`resume-cluster`. If 
  you don't plan on using your cluster in the next few weeks, we recommend 
  :ref:`exporting <mongodump>` the data and :ref:`terminating <terminate-cluster>` 
  the cluster. 

- Adds a configurable expiration duration for regional outage simulations to solve 
  stuck simulations. 
  You can select a duration of 1 day, 3 days (default), or 7 days, after which the 
  simulation automatically ends.
     
  {+service+} checks for expired simulations in 24-hour intervals so it may take 
  up to an additional day after the expiration date for the simulation to fully 
  resolve.

- Adds a ``Maintenance window completed`` event to the :ref:`Project Activity Feed <activity-feed>` 
  to confirm when maintenance operations finish.

- Adds support for cross-region :ref:`cloud-based initial sync
  <cloud-based-initial-sync>` between {+aws+} nodes. This allows
  {+service+} to provision new data nodes from existing nodes in a
  different {+aws+} region by leveraging {+aws+} snapshot capabilities.
  To further speed up data copy across regions, you can
  :ref:`Enable Faster Cross-Region Initial Sync for AWS Clusters
  <enable_time_based_initial_sync_aws>`. 

- Changes :ref:`connection rate limits <connection-rate-limits>` for
  ``M10`` and ``M20`` cluster tiers from 20 to 15 connections per
  second.

.. _atlas_2025_10_22:

22 October 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds AWS PrivateLink support for the Prometheus integration.
- Removes the ability to create new Serverless instances in |service|.
  To learn more, see :ref:`flex-migration`.

.. _atlas_2025_08_27:

27 August 2025 Release
~~~~~~~~~~~~~~~~~~~~~~  

- Introduces Intelligent Workload Management (IWM), a dynamic resource manager
  in |service|. :abbr:`IWM (Intelligent Workload Management)` enables
  real-time workload monitoring and automated safeguards to maintain
  high availability under load. The first policy, now active for eligible
  clusters, blocks user writes when disk space is nearly full to prevent
  node crashes and maintain read availability. To learn more, see :ref:`Write-Blocking <cluster-blocking-writes>`.
  If you enable auto-scaling, your cluster has the opportunity to scale up
  before write-blocking behavior activates.

- Applies :ref:`connection rate limits <connection-limits>` to ``M10``
  and ``M20`` cluster tiers to protect cluster availability. These
  limits restrict the number of new connections each node processes to
  20 connections per second. Connections exceeding these limits are
  queued, and if the period of overload is sustained, some connections
  are dropped.


.. _atlas_2025_08_06:

6 August 2025 Release
~~~~~~~~~~~~~~~~~~~~~

-  Adds a :guilabel:`total namespaces` count to the :guilabel:`Catalog` cluster
   metric that displays the total number of collections and indexes
   across all non-system databases, and adds a new :ref:`default alert 
   <default-alert-settings>` that warns users when :alert:`Total Namespaces is` 
   over 10,000.

- Makes the ability to :ref:`send resource tags to Prometheus
  <prometheus-integration>` an opt-in feature. 

.. _atlas_2025_07_16:

16 July 2025 Release
~~~~~~~~~~~~~~~~~~~~~~

-  Makes the ability to :ref:`send resource tags to Datadog <datadog-tags>` an
   opt-in feature. 

.. _atlas_2025_06_04:

4 June 2025 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds line items detailing :ref:`support subscription charges
  <view-subscription-charges>`, per project simplifying cost visualization for customers
  with multiple projects and reducing manual effort.   

.. _atlas_2025_05_07:

7 May 2025 Release
~~~~~~~~~~~~~~~~~~~

- Adds shareable URL support for the :ref:`Query Profiler <query-profiler>`, enabling
  copying and pasting Query Profiler URLs for an easier workflow when working with slow
  logs.

- Implements General UX fixes and improvements to Query Profiler, including: 
  
  - Increased log retention from five to seven days. 
  - Improved available filter selections.

.. _atlas_2025_04_23:

23 April 2025 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds a preview of a redesigned navigation experience in |service|.
  The redesigned navigation provides a composable and scalable {+atlas-ui+}
  structure, improves the self-discovery of |service| services, and
  offers clear navigation across services and resources. To learn more,
  see :ref:`faq-nav`.

- In preparation for the mongomirror End of Life (EOL) on July 31, 2025,
  lifts the limitation that source and destination cluster versions must
  be the same and allows you to live migrate source clusters running
  MongoDB versions 4.4 and 5.0 to destination |service| clusters running
  MongoDB versions 6.0 and 7.0. To learn more, see :ref:`import-strategies`.

.. _atlas_2025_04_02:

2 April 2025 Release
~~~~~~~~~~~~~~~~~~~~

- Adds service accounts that allow you to manage projects in all your
  organizations by granting each organization programmatic access to the
  projects. You can use service accounts or |api| keys. To learn about
  service accounts versus |api| keys, see :ref:`programmatic-access`.

- Improves information you see in your invoices, including your current invoice,
  and allows you to view the total costs separately from the total credit usage.
  You can also export invoices to PDF or CSV, pay invoices for a
  :ref:`subscription <activate-subscription>` and explore :ref:`invoice cost charts <invoice-charts>`.
  To learn more, see :ref:`billing`.

- Allows you to filter and view the cluster type, such as Dedicated or Flex,
  on the `All Clusters <https://cloud.mongodb.com/v2#/clusters>`__ page in the {+atlas-ui+}.

- Adds new sharding metrics, :guilabel:`Orphan Count`, which is the number
  of orphaned documents in the shard, and :guilabel:`Orphan Data Size`,
  which is the size in bytes of orphaned documents in the shard when uncompressed.
  To learn more, see :ref:`review-available-metrics`.

- Adds the :dbcommand:`autoCompact` privilege action in |service| that allows database
  users with the :atlasrole:`atlasAdmin` role to enable background compaction.
  This privilege action is supported only on dedicated clusters running
  MongoDB 8.0+. To learn more, see :ref:`faq-reduce-storage-usage`

.. _atlas_2025_03_12:

12 March 2025 Release
~~~~~~~~~~~~~~~~~~~~~~

- Sends cluster :ref:`resource tags <configure-resource-tags>`
  to :ref:`DataDog <datadog-integration>` and :ref:`Prometheus <prometheus-integration>`
  metrics integrations.
- Removes support for SMS authentication. Only existing SMS users can
  continue to use this method with their current phone numbers.
  |service| does not accept new SMS registrations. To learn more about
  recommended authentication methods, see :ref:`atlas-enable-mfa`.

.. _atlas_2025_02_20:

20 February 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support in the following new regions:

  - :ref:`Amazon Web Services (AWS) regions <amazon-aws>`:

    - ``MX_CENTRAL_1``, Querétaro, Mexico
    - ``AP_SOUTHEAST_5``, Malaysia
    - ``AP_SOUTHEAST_7``, Thailand

    In the second half of 2025, the IP addresses of nodes deployed to
    ``AP-SOUTHEAST-7`` and  ``MX-CENTRAL-1`` might change to accommodate
    future growth of |service| in these geographies.

  - :ref:`Google Cloud Platform (GCP) regions <google-gcp>`:

    - ``NORTH_AMERICA_SOUTH_1``, Querétaro, Mexico
    - ``AFRICA_SOUTH_1``, Johannesburg, South Africa

  - :ref:`Microsoft Azure regions <microsoft-azure>`:

    - ``MEXICO_CENTRAL``, Querétaro State, Mexico
    - ``SPAIN_CENTRAL``, Madrid, Spain
    - ``SOUTH_AFRICA_NORTH``, Johannesburg, South Africa
    - ``SOUTH_AFRICA_WEST``, Cape Town, South Africa
    - ``NEWZEALAND_NORTH``, Auckland, New Zealand

.. _atlas_2025_02_05:

5 February 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds :ref:`disk throughput <alert-conditions-disk-throughput>` and
  :ref:`push-based log export <alert-conditions-push-based-log-export>`
  alert conditions.

- Improves :ref:`cluster auto-scaling <cluster-autoscaling>` and elasticity
  for ``M10`` and ``M20`` {+clusters+}, responding to resource demands
  up to five times faster. Optimizes workload performance and availability,
  potentially lowering costs.

- Allows you to set protected hours for your project, during which |service|
  avoids performing standard updates to the clusters. To learn more,
  see :ref:`maintenance-window-protected-hours`.

- Introduces :ref:`Atlas resource policies <atlas-resource-policies-overview>`
  in public preview. |service| resource policies define configuration standards
  for MongoDB {+clusters+} across your organization, with options to limit
  cloud providers, regions, and wildcard IPs.

.. _atlas_2025_01_08:

8 January 2025 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the :authrole:`Project Database Access Admin`, :authrole:`Project Backup Manager`,
  and :authrole:`Project Observability Viewer` roles that allow for more
  granular access within |service| projects.

