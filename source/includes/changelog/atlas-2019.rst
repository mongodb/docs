.. _atlas_20191210:

10 December 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports ``M0`` {+Free-clusters+} and ``M2/M5`` {+Shared-clusters+} in
  the |gcp| Japan (Tokyo) and |azure| Canada Central (Toronto) regions.

- Introduces
  :ref:`Atlas Triggers integration with Amazon EventBridge <atlas-aws-eventbridge>`.

- Introduces
  :ref:`Identity Federation with SAML <atlas-federated-authentication>`.

- Supports higher maximum connection limits for new cluster deployments
  on select cluster tiers:

  - ``M10`` lifted from 350 to 1,500
  - ``M20`` lifted from 700 to 3,000
  - ``M30`` lifted from 2,000 to 3,000
  - ``M40`` lifted from 4,000 to 6,000

.. _atlas_20191112:

18 November 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports :doc:`Private Endpoints with AWS PrivateLink </security-private-endpoint>`.

- Supports "Passwordless" X.509 authentication for database users. You
  can :doc:`Configure Database Users </security-add-mongodb-users>`
  to use Atlas-managed X.509 authentication, or you can
  :doc:`Set up Self-Managed X.509 </security-self-managed-x509>`.

- Enhancements to index recommendations in
  :doc:`Performance Advisor </performance-advisor/index-ranking>`.

- Enables always-on database-level authentication
  :ref:`access auditing <access-tracking>` for {+dedicated-clusters+}.

- Enables API management for :oas-atlas-tag:`third party service 
  integrations </Third-Party-Service-Integrations>` like DataDog and 
  Slack.

- Enables API management for AWS security group IDs on the |service|
  :oas-atlas-tag:`project IP access list </Project-IP-Access-List>` 
  when using VPC peering.

- Introduces the ``humanReadable`` field to webhook alert
  notifications. This field contains a human-readable description of
  the alert.

- Includes new guides for configuring |service| to authenticate and
  authorize users from third-party LDAP providers:

  - :doc:`/security-ldaps-okta`

  - :doc:`/security-ldaps-onelogin`

- :ref:`Billing invoices <view-download-current-invoice>` now show
  usage by project in the :guilabel:`Summary by Project` section.

.. _atlas-v20191022:

23 October 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports the following |azure| regions:

  - Germany West Central
  - Switzerland North

- Supports ``M0`` {+Free-clusters+} and ``M2``/``M5`` {+Shared-clusters+}
  in the |gcp| Brazil (São Paulo) region.
- Supports ``M0`` {+Free-clusters+} in the |aws| Syndey region.
- Enables faster
  :ref:`restores from {+Cloud-Backup+} backups <restore-from-snapshot>`.

.. _atlas-v20191001:

01 October 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`compute auto-scaling <cluster-autoscaling>` in
  public preview.
- Enhances Integrations interface for third party services.
- Introduces EU destinations for DataDog and Opsgenie integrations.
- Supports the official
  `Terraform MongoDB Atlas Provider <https://www.terraform.io/docs/providers/mongodbatlas/>`__.
- Supports the :osb:`MongoDB Atlas Open Service Broker </>` for
  Kubernetes.
- Introduces :ref:`{+PIT-Restore+} (PITR) <pit-restore>`
  available for clusters using |aws|
  :ref:`{+Cloud-Backup+}s <backup-cloud-provider>`.
- Increases throughput for M2 & M5 {+cluster+} tiers.

.. _atlas-v20190910:

10 September 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces the :ref:`Query Profiler <profile-database>` for ``M10+``
  clusters.

- Newly deployed |service-fullname| clusters in the following Azure
  regions will be spread across availability zones:

  - Central US
  - East US
  - East US 2
  - West US 2
  - France Central
  - North Europe
  - UK South
  - West Europe
  - Japan East
  - Southeast Asia

  Pre-existing clusters, and clusters in all other Azure other regions
  will continue to be deployed in *Availability Sets*.

- Internal {+MongoDB-Realm+}/Charts-created database users and IP
  access list entries no longer show in the Atlas console.

- MongoDB Cloud billing authenticates credit cards for customers in the
  European Economic Area in compliance with the second Payment Services
  Directive (PSD2). To learn more about Strong Customer Authentication,
  see :ref:`sca-changes`.

.. _atlas-v20190820:

20 August 2019 Release
~~~~~~~~~~~~~~~~~~~~~~

- Supports the |aws| Bahrain region.
- Changes the preferred region in a multi-region cluster without
  requiring a rolling resync.
- Adds key-value pair labels to cluster resources in the Public API.

.. _atlas-v20190730:

30 July 2019 Release
~~~~~~~~~~~~~~~~~~~~

- Supports the Azure United Arab Emirates North region.
- Introduces ``M80`` general class cluster tier on |aws| offering
  next-gen infrastructure. This replaces the more expensive ``M100``.
- Removes ``M100`` cluster tier on |aws| as an option for new cluster
  deployments.
- Disables the ability to create new Personal |api| Keys. These keys
  are deprecated. Use
  :ref:`Programmatic API Keys <about-project-api-keys>`
  to access the |mms| |api|.

.. _atlas-v20190709:

09 July 2019 Release
~~~~~~~~~~~~~~~~~~~~

- Enables free daily backups for M2 and M5 {+clusters+}.
- Unifies the login experience: accounts for MongoDB Cloud, Support,
  and JIRA use the same credentials.
- Adds new project-level role :authrole:`Project Cluster Manager`. This
  role allows operators to scale clusters but not allow those operators
  to:

  - Terminate clusters,
  - Change the security configuration changes, or
  - Access data.

- Allows deploy single-shard sharded clusters in Atlas.

.. _atlas-v20190611:

18 June 2019 Release
~~~~~~~~~~~~~~~~~~~~

- Supports MongoDB 4.2.

- Supports ``$searchBeta``.

  - Includes Memory, CPU, and Disk Usage :ref:`monitoring <monitor-cluster-metrics>`.
    For more information, see :ref:`Performance Considerations <perf-ref>`.

  - Includes alerts for Memory.

  - Requires MongoDB 4.2.

- Introduces {+adf+} on-demand query service.

- Supports :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>`
  for 4.2 replica sets.

- Supports Encryption at Rest for snapshots.

- Added :ref:`Aggregation Pipeline Builder <atlas-ui-agg-pipeline>` to the
  :doc:`{+atlas-ui+} </atlas-ui>`.

.. _atlas-v20190528:

29 May 2019 Release
~~~~~~~~~~~~~~~~~~~

- Support for |gcp| Osaka region.
- Support to search for organization or project names
  that are one character long.

.. _atlas-v20190507:

07 May 2019 Release
~~~~~~~~~~~~~~~~~~~

- :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>` are now
  available for |gcp|-backed clusters.

- |service| clusters can now use
  :doc:`Google Cloud KMS for encryption at rest </security-gcp-kms>`.

- |service| clusters now have a new MongoDB configuration option that
  allows agents to continue connecting even if you have exceeded the
  maximum number of connections. For example, this means that |service|
  continues to gather monitoring data after reaching the maximum number
  of connections. This change affects all new |service| clusters.
  Existing |service| clusters are affected the next time you request a
  configuration change to a cluster.

- |service| projects may now use either the {+Old-Backup+} or the
   :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>` backup
   method. An |service| project supports multiple backup types among
   clusters within that project. You must terminate the existing
   backup method before switching between backup methods for an
   |service| cluster.

- Enhanced left-hand navigation.

.. _atlas-v20190416:

16 April 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports Microsoft Azure VNet :doc:`peering </security-vpc-peering>`.
- Can load :ref:`sample data <load-sample-data>` into an
  |service| cluster.
- Supports the :ref:`Microsoft Azure <microsoft-azure>` South Africa
  North region.
- Supports the :ref:`Google Cloud Platform <google-gcp>` Zurich region.
- Offers self-serve customers option to sign up for a
  :doc:`support package </support>`.

.. _atlas-v20190326:

26 March 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- |service| clusters can re-use public IP addresses when replaced in
  the same region.
- Can configure backup schedule and retention for Snapshots Backup.
- |aws| EC2 Capacity for all cluster tiers in all regions and
  availability zones is visible via the |service| Admin UI.

.. _atlas-v20190305:

05 March 2019 Release
~~~~~~~~~~~~~~~~~~~~~

- UX improvements to the cluster :guilabel:`Connect` modal.
- Most server replacements get initial data from a disk snapshot of the
  primary instead of an initial sync.
- Support for new {+Shared-cluster+} regions:

  - AWS

    - ``eu-central-1`` (``M2/M5``)
    - ``eu-west-1`` (``M0``)
    - ``us-west-2`` (``M0``)

  - Azure

    - ``northeurope`` (``M0``)
    - ``westus`` (``M0/M2/M5``)

- {+Cloud-Backup+}s for Geo-sharded clusters.

.. _atlas-v20190212:

13 February 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports Google Cloud Peering.
- Introduces Analytics Nodes. These are similar to read-only nodes but
  this special node type makes use of replica set tags to let you
  target workloads to specific secondaries.
- Support for |aws| Stockholm region. With this
  region comes a new largest cluster, ``M700``.
- |service| on :ref:`Azure <microsoft-azure>` 2.0.

  -  ``M10``, ``M80``, and ``M200`` clusters are now supported in all
     regions. The ``M90`` tier is going to be removed shortly.
  - Pricing reductions in most regions.
  - All :ref:`Azure <microsoft-azure>` clusters have been migrated to
    latest generation hardware.

.. _atlas-v20190122:

23 January 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Optimizes safe cluster upgrades after failure (no user-facing
  components, internal |service| planner optimizations).
- Allows creation of API Keys that are scoped to an organization and
  are not tied to a human.
- Credit cards will be authorized for a small amount ($1.00) to reduce
  the risk of failed charges.
- Users can now remove themselves from a project.

.. _atlas-v20190101:

01 January 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Optimizes automated rollout to ensure that rollouts happen within
  1 U.S. East business day for non-maintenance-window projects.
- Provides more visibility to maintenance timing in the administration
  user interface.
- Supports On-Demand
  :doc:`{+Cloud-Backup+}s </backup/cloud-backup/overview>`.
