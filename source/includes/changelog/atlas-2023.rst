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
  MongoDB 6.0.4 or later. To learn more, see :ref:`Live Migrate a MongoDB 6.0.4 or Later Cluster into Atlas
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
  destination {+clusters+} for replica sets running MongoDB 6.0.4 or later.
  To learn more, see :ref:`Live Migrate a MongoDB 6.0.4 or Later Cluster into Atlas
  <c2c-pull-live-migration>`.

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

Supports converting {+shared-clusters+} (``M0``, ``M2``, ``M5``) to {+serverless-instances+}.
