.. _atlas_2023_13_12:

13 December 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports auto-index creation for |service| {+Serverless-instances+}.
- Supports migrations between sharded {+clusters+} with a different
  number of shards for MongoDB 6.0+ with Atlas Live Migration. To learn
  more, see :ref:`c2c-pull-live-migration`.
- Integrates push-based logging with |aws| |s3|. To learn more, see :ref:`mongodb-logs-push`.
- Supports programmatic IP access list for secure |service| communication
  by using customer-managed encryption keys. To learn more, see :ref:`atlas-add-nodes-to-encrypted-cluster`.
- Rejects :ref:`test failover <test-failover>` if {+cluster+} is not fully healthy.
- Adds the :oas-bump-atlas-op:`returnAllControlPlaneIpAddresses API endpoint <listcontrolplaneipaddresses>`
  that returns a list of inbound and outbound |service| control plane IP
  addresses in |cidr| categorized by cloud provider and region. To learn more,
  see :ref:`Allow Access From the Atlas Control Plane <atlas-ear-allow-access-via-control-plane>`.


.. _atlas_2023_05_12:

05 December 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Increases the minimum threshold for archiving data after 7 days from 100 kB to 5 MiB. 
  To learn more, see :ref:`config-online-archive-limitations`.

.. _atlas_2023_27_11:

27 November 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Makes MongoDB 7.1 generally available for all deployments.

.. _atlas_2023_15_11:

15 November 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Provides preview of dark mode for the {+atlas-ui+}. To learn more, 
  see `the MongoDB blog <https://www.mongodb.com/blog/post/dark-mode-for-atlas-now-available-public-preview>`__.
- Supports node availability zones for replica set tags. To learn more,
  see :ref:`replica-set-tags`.

.. _atlas_2023_10_18:

18 October 2023 Release 
~~~~~~~~~~~~~~~~~~~~~~~

- Adds new regions for |azure| |nvme| {+clusters+}. 

.. _atlas_2023_10_04:

04 October 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports Push Live migration through
  PrivateLink for MongoDB 6.0+ sharded |service| {+clusters+}. 
- Decomissions :manual:`free monitoring </administration/free-monitoring/>`.

.. _atlas_2023_08_23:

23 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~~

- Introduces the following billing improvements: 

  - Lowers RPU billing for serverless instances with read-heavy
    workloads.
  - Supports viewing and analyzing |service| usage with a billing cost
    explorer. To learn more, see :ref:`Billing Cost Explorer
    <atlas-billing>`. 
  - Supports viewing resource tags in |service| billing invoices through
    the {+atlas-admin-api+} and billing invoice |csv| exports. To learn
    more, see :ref:`resource-tags-on-invoices`.

- Provides preview of using Terraform Provider v1.11.1 or higher to
  manage your workforce's access to |service-fullname| with :abbr:`OIDC
  (OpenID Connect)`. To learn more, see
  :ref:`oidc-authentication-authorization`.

.. _atlas_2023_08_02:

2 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`online archives <online-archive-overview>` as a source
  for {+adf+}. To learn more, see
  :ref:`adf-configuration-file-oa`.
- Adds a new :ref:`project overview <project-overview>` that displays
  modules containing common |service| actions. You can configure the 
  project overview to display as your project's landing page.

.. _atlas_2023_07_12:

12 July 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Provides preview of MongoDB 7.0+ databases support for {+dedicated-clusters+}.
- Supports cross-organization billing in :atlas:`Atlas for Government </government>`.
- Releases v2.0 of the :atlas:`Atlas Admin API </reference/api-resources-spec>`. 
  To learn more, see :ref:`api-versioning-overview`.

  .. important:: 

     This version unifies the |api| endpoints for single-cloud {+clusters+}
     and :ref:`multi-cloud <create-cluster-multi-region>` {+clusters+}
     under the :oas-bump-atlas-tag:`Clusters <clusters>` |api| resource.

.. _atlas_2023_06_14:

14 June 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`tags <database-deployment-tags>` for your |service|
  {+database-deployments+} through the {+atlas-ui+}, {+atlas-admin-api+},
  and {+atlas-cli+}.  
- Provides preview of :ref:`federated access
  <oidc-authentication-authorization>` to MongoDB 7.0+ databases on 
  |service| using an identity provider (IdP) that supports OpenID
  Connect (OIDC), including |azure-ad|, Okta, and Ping Identity.
- Introduces resource-level :ref:`versioning <api-versioning-overview>`
  in the {+atlas-admin-api+}.
- Provides :ref:`Go SDK <atlas-admin-sdk>` to fetch or modify data from
  the {+atlas-admin-api+}.
- Introduces new :authrole:`Organization Billing Viewer` :ref:`role
  <user-roles>` to restrict billing access to authorized users. 
- Supports an optional ``federationSettingsId`` parameter in the 
  :oas-bump-atlas-tag:`createOneOrganization <clusters>` |api|
  endpoint to link an |service| organization to an existing
  :ref:`federated access <oidc-authentication-authorization>`
  configuration.   
- Introduces fine-grained data modification and scalability improvements
  for time series data. 

.. _atlas_2023_05_24:

24 May 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports one new |azure| :ref:`region <microsoft-azure>`:

  - ``qatarcentral`` (Doha, Qatar)

- Supports five new |gcp| :ref:`regions <google-gcp>`:

  - ``me-west1`` (Tel Aviv, Israel)
  - ``europe-west12`` (Turin, Italy)
  - ``me-central1`` (Doha, Qatar)
  - ``us-east5`` (Columbus, OH, USA)
  - ``us-south1`` (Dallas, TX, USA)

- Sets the limit of unique :ref:`shard keys for Global Clusters <shard-global-collection>`
  per |service| :ref:`project <projects>` to 40.
  To learn more, see :ref:`atlas-limitations`.

.. _atlas_2023_05_03:

3 May 2023 Release
~~~~~~~~~~~~~~~~~~~

- Supports five new |aws| :ref:`regions <amazon-aws>`:

  - ``ap-south-2`` (Hyderabad, India)
  - ``ap-southeast-4`` (Melbourne, Victoria, Australia)
  - ``eu-central-2`` (Zurich, Switzerland)
  - ``eu-south-2`` (Spain)
  - ``me-central-1`` (UAE)

- Adds the ability to pull a source sharded {+cluster+} to |a-service|
  sharded {+cluster+} for source and destination {+clusters+} running
  MongoDB 6.0.5 or later. To learn more, see :ref:`Live Migrate a MongoDB 6.0.5 or Later Cluster into Atlas
  <c2c-pull-live-migration>`.

- Upgrades each of your {+clusters+} that run MongoDB 4.2 to MongoDB 4.4.
  MongoDB 4.2 reached end of life on 30 April 2023, according to the
  :website:`MongoDB Support Policy </support-policy>`. The upgrade to
  MongoDB 4.4 runs within your maintenance window if you
  :ref:`configured one in your project settings <atlas-modify-project-settings>`.

.. _atlas_2023_04_12:

12 April 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates the default MongoDB version for all new |service| 
  {+clusters+} to MongoDB 6.0.
  
  - Automatically upgrades all free tier 
    (``M0``) and shared tier (``M2`` and ``M5``) {+clusters+} to 
    MongoDB 6.0.

- Supports enabling a :ref:`{+bcp+} <backup-compliance-policy>` to 
  protect your backup data.

- Improves the :ref:`IP Access List <atlas-ui-ip-access-list>` for the 
  {+atlas-ui+} so that you can use the same IP access list to restrict 
  API access to |service|, and access to the {+atlas-ui+}.

- Supports user-defined metrics labels from |service| to :ref:`Datadog 
  <datadog-integration>`.

.. _atlas-2023_03__22:

22 March 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports the ability to live migrate the source {+clusters+} to |service|
  destination {+clusters+} for replica sets running MongoDB 6.0.5 or later.
  To learn more, see :ref:`Live Migrate a MongoDB 6.0.5 or Later Cluster into Atlas
  <c2c-pull-live-migration>`.

.. _atlas_2023_03_01:

1 March 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces generally available |service| integrations for |aws| 
  CloudFormation and the |aws| Cloud Development Kit (CDK). To learn 
  more, see `MongoDB Atlas Integrations for AWS CloudFormation and CDK are now Generally Available <https://www.mongodb.com/blog/post/atlas-integrations-aws-cloud-formation-cdk-now-generally-available>`__.

.. _atlas_2023_02_15:

15 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds SCRAM-SHA-256 as the default authentication mechanism for database
  users in |service|. To learn more, see :ref:`mongodb-users`.
- Supports simulating an outage for |service| for regions that contain a
  majority of database nodes, and reconfiguring a {+cluster+} from an
  unhealthy to a healthy state in the event of such an outage.
- Supports connecting to your database behind private endpoints with an
  optimized SRV connection string for sharded clusters.
- Adds a streamlined experience for users deploying their first |service|
  database using templates for best practices.
- Adds EU region support for the PagerDuty integration.
  
.. _atlas_2023_01_25:

25 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

Supports converting Shared clusters (``M0``, ``M2``, ``M5``) to {+Serverless-instances+}.
