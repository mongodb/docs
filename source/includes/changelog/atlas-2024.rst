.. _atlas_2024_12_04:

4 December 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`Shared and Flex clusters <shared-tier-cluster>`.
- Allows you to :ref:`verify your data during live migrations to Atlas
  <verify-migrations>`.
- Updates the :oas-atlas-op:`createThirdPartyIntegration </createThirdPartyIntegration>`
  API resource for the :ref:`Datadog integration <datadog-integration>` with
  ``sendCollectionLatencyMetrics`` and ``sendDatabaseMetrics`` options
  for sending data from your |service| {+cluster+} to Datadog.

- Sends the ``availability_zone``, ``provider``, and ``region`` replica set
  tags as part of the metrics payload to Prometheus. Adding these tags
  allows you to aggregate data by region, provider, and availability zone.
  To learn more, see :ref:`Return the Latest Targets for Prometheus <prometheus-discovery-endpoint>`.

- Supports filtering the results in the :ref:`Performance Advisor <performance-advisor>`
  by shards and hosts, namespace, time range, and date and time.

.. _atlas_2024_11_13:

13 November 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds :authaction:`checkMetadataConsistency` to the list of supported
  privilege actions for the |service| administrators under the
  :ref:`built-in roles <atlas-user-privileges>`.
- Starting from October 31, 2024, stops support for MongoDB 5.0,
  which is EOL. To learn more, see :ref:`What happens to Atlas clusters using a MongoDB version nearing end of life? <atlas-eol-upgrade>`

.. _atlas-2024_10_31:

31 October 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports filtering the results in the :ref:`Query Profiler 
  <query-profiler>` by hosts.

.. _atlas_2024_10_23:

23 October 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports MongoDB 8.0 and upgrades ``M0`` and ``M2/M5`` {+clusters+}
  to MongoDB 8.0. To learn more, see :manual:`MongoDB 8.0 Release Notes </release-notes/8.0/>`.

- Adds an option to specify a designated |service| :ref:`security contact <organization-settings>`
  to receive security-related notifications.

- Improves :ref:`auto-scaling and elasticity <cluster-autoscaling>` for
  |service| {+clusters+} to allow you to scale |service| {+clusters+} up
  to 50% faster, respond to resource demands 5X faster in real-time,
  and optimize performance, while reducing operational costs.

- For |service| {+clusters+} deployed on |aws| and |azure|, allows you to
  download the snapshot over the private endpoints in the same region as
  the snapshot. To learn more, see :ref:`Restore from a Locally-Downloaded Snapshot <restore-from-local-file>`.

- Adds the ``PAGES_REQUESTED_FROM_CACHE`` and the ``DISK_QUEUE_DEPTH`` metrics
  to the list of metrics you can send from your |service| {+cluster+} to Datadog.
  To learn more, see :ref:`Integrate with Datadog <datadog-integration>`.

- Adds the ``ttldeleted`` metric to the ``Opcounters`` hardware metric.
  To learn more, :ref:`review available metrics <review-available-metrics>`
  and search for ``ttldeleted``.

.. _atlas_2024_10_02:

2 October 2024 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds ``M10`` {+cluster+} tier support for the :ref:`Azure <microsoft-azure-supported-regions>`
  ``SWEDEN_CENTRAL`` and ``SWEDEN_SOUTH`` regions.

.. _atlas_2024_09_11:

11 September 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the :guilabel:`Disk Throughput` read and write :ref:`metric <review-available-metrics>`.

- Adds the :guilabel:`Cache Ratio` :ref:`metric <review-available-metrics>`.
  A high cache fill ratio indicates that most data requests are being served
  from memory, leading to faster query performance and reduced disk I/O. 

- Sends an email if your live migration process is successful,
  pending 12 hours after the cutover, or has failed.

- Adds a `Private Preview program <https://www.mongodb.com/products/platform/atlas-online-archive#promo>`__ for :ref:`Online Archive
  <online-archive-overview>` for |service| {+clusters+} deployed on |gcp|.

- Supports using a customer-managed key (CMK) from Azure Key Vault (AKV)
  to further encrypt your data at rest in |service|. To learn more,
  see :ref:`Manage Customer Keys with Azure Key Vault <security-azure-kms-pvt-endpoint>`.

.. _atlas_2024_08_21:

21 August 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports |azure| Extended Standard |iops| and Extended Storage to limited regions.
  For :guilabel:`Low CPU` or :guilabel:`General` {+clusters+} deployed on
  |azure| in one of the :ref:`regions that support extended storage <microsoft-azure-storage-supported-regions>`,
  you can extend |iops| and the data volumes' storage capacity in the {+atlas-ui+}.
  To learn more, see :ref:`Extend Storage Capacity and IOPS on Azure <change-storage-capacity-azure>`.

.. _atlas_2024_07_31:

31 July 2024 Release
~~~~~~~~~~~~~~~~~~~~

- Supports {+cluster+} snapshots on |azure|. To learn more, see :ref:`Export Cloud Backup Snapshot <cloud-provider-snapshot-export>`.
- Converts auto-scaling notifications into configurable alerts. To learn
  more, see :ref:`Configure Alerts for Auto-scaling Events <custom-alerts-auto-scaling-events>`.

.. _atlas_2024_07_10:

10 July 2024 Release
~~~~~~~~~~~~~~~~~~~~

- Allows you to :ref:`export your cloud backup snapshots
  <cloud-provider-snapshot-export>` to an {+az-bs+} Container.

- Provides efficient :ref:`cross-project restores <aws-cross-project>`
  for {+database-deployments+} that have {+gcp+} and {+azure+} nodes
  created after March 27, 2024.

- Allows you to enable faster restores for {+aws+}.

.. _atlas_2024_06_20:

20 June 2024 Release
~~~~~~~~~~~~~~~~~~~~

- Adds resource tags :ref:`defined in projects <project-tags>` to customer 
  invoice |csv| exports and invoice |api| responses. 

.. _atlas_2024_05_30:

30 May 2024 Release
~~~~~~~~~~~~~~~~~~~

- Increases shard limit for |a-service| {+cluster+} from 50 to 70.

- Adds the ability to unlink organizations from your paying organization from 
  the {+atlas-ui+}. To learn more, see :ref:`unlink-with-cross-org-billing`.

- Removes support for legacy two-factor authentication. 
  Use :ref:`multi-factor authentication <atlas-enable-mfa>` instead.

.. _atlas_2024_04_30:

30 April 2024 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces the general availability of |oidc| :ref:`Workforce Identity Federation <oidc-authentication-workforce>` 
  and :ref:`Workload Identity Federation <oidc-authentication-workload>`.

.. _atlas_2024_04_17:

17 April 2024 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds the Migration Hub to |service|. The Migration Hub displays
  available migration resources and the status of migrations in progress.
  To learn more, see :ref:`monitor-migrations`.

- Allows you to add low carbon regions and shows :guilabel:`Low Carbon` indicators
  on |aws| and |gcp| regions when you create a {+cluster+} in the {+atlas-ui+}.

- Allows you to :ref:`monitor collection-level query latency <namespace-insights>`
  in a new :guilabel:`Query Insights` tab in the {+atlas-ui+}.
  |service| supports this metric for ``M10+`` {+dedicated-clusters+}.

- When you upgrade a replica set to a multi-sharded {+cluster+}, requires
  that you upgrade to a **single** shard {+cluster+} first, by restarting
  your application, **reconnecting** to the {+cluster+}, and then adding
  additional shards. To learn more, see :ref:`scale-cluster-sharding`.


.. _atlas_2024_03_27:

27 March 2024 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds disk, memory, and CPU utilization metrics to the sharded cluster metrics
  page UI view.
- Disables a load balancer on source {+clusters+} during live migration.
  To learn more, see :ref:`balancers in pull live migration <lm-pull-load-balancers>` and
  :ref:`balancers in push live migration<lm-push-load-balancers>`.

.. _atlas_2024_03_06:

6 March 2024 Release
~~~~~~~~~~~~~~~~~~~~~

- Allows you to specify ``yearly`` option in the :ref:`backup policy <configure-backup-policy>`.
- Allows you to use the {+atlas-ui+} to :ref:`add team members <edit-team-members>`
  that are part of the organization or users that previously received an
  invitation to join the organization.

.. _atlas_2024_02_28:

28 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Supports archiving data using {+Online-Archive+} to |azure| storage
  for |service| {+clusters+} deployed on |azure|. To learn more,
  see :ref:`config-online-archive`.

.. _atlas_2024_02_14:

14 February 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`{+atlas-sp+} <atlas-sp-overview>` in
  public preview. With {+atlas-sp+}, you can process streaming data in 
  |service|.
- Supports |service| deployments in the following new 
  :ref:`cloud provider regions <cloud-providers-list>`:

  - |aws|
   
    - Israel (``il-central-1``)
    - Canada West (``ca-west-1``)

  - |azure|

    - Poland (``polandcentral``)
    - Israel Central (``israelcenttral``)
    - Italy North (``italynorth``)

  - |gcp|

    - Berlin, Germany (``europe-west10``)

- Supports adding resource tags to projects in |service|. To learn
  more, see :ref:`project-tags`.

- Fixes an issue where |service| inaccurately reported the 
  :guilabel:`network bytes out` metric that appears in the 
  :guilabel:`System Network` chart. This release resets this metric and 
  the previous values no longer appear. To learn more, see 
  :ref:`review-available-metrics` and :alert:`System Network Out is`.

.. _atlas_2024_01_24:

24 January 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports MongoDB 7.2.
- Supports |gcp| for |service| oplog store. To learn more, see
  :ref:`pit-restore`. 

.. _atlas_2024_01_04:

4 January 2024 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports replica set to sharded cluster migrations on MongoDB
  6.0.8+ with Atlas Live Migration (pull). To learn more, see
  :ref:`c2c-pull-live-migration`.
- Supports cluster node disk pre-warming. To learn more, see
  :ref:`disk-pre-warming`.
