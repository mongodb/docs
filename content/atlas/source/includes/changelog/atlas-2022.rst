.. _atlas_2022_0914:

14 December 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to configure some |service| project limits using the :oas-bump-atlas-op:`Projects Administration API resource <updategroupinvites>`.
- Adds the ability to push live migrations of replica sets using private endpoints.
- Introduces :ref:`atlas-go-to`.

16 November 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to :ref:`simulate a regional outage <test-outage>` for |service|.

26 October 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Introduces :ref:`Termination Protection <scale-cluster-termination-protection>` 
  for {+database-deployments+}.
- Adds a :ref:`project setting <atlas-modify-project-settings>` that lets you
  configure some M40+ {+clusters+} with greater maximum storage than the standard limit.
- Adds the :guilabel:`Set Oplog Size` UI configuration setting. This setting
  allows you to set the :ref:`minimum retention window for Oplog entries <set-oplog-min-window>`.
  You can see the :guilabel:`Set Oplog Size` configuration setting in the UI only
  if you previously configured it for your {+cluster+}. For all new {+clusters+},
  set the :guilabel:`Minimum Oplog Window` instead.

05 October 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds three more :ref:`google-gcp` regions:

  - ``europe-west8`` (Milan, Italy)
  - ``europe-west9`` (Paris, France)
  - ``europe-southwest1`` (Madrid, Spain)

- Adds the ability to automatically :ref:`copy backup snapshots to other 
  regions <snapshot-distribution>`.
- Improves the :ref:`memory utilization calculation <howitworks-scale-cluster-tier>` 
  used to auto-scale {+clusters+}.

14 September 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Introduces the :guilabel:`Local NVMe SSD` storage option in the |service|
  UI for some {+dedicated-clusters+} that run on |azure|. Locally
  attached  ephemeral :ref:`NVMe SSDs <nvme-storage>` offer the highest
  level of speed and performance. To learn more, see :ref:`nvme-storage`.
- Adds the ``enableSharding`` privilege to custom database roles.
- Adds the ability to set the 
  `maximum lifetime <https://www.mongodb.com/docs/atlas/cluster-additional-settings/#set-transaction-lifetime>`__
  of multi-document transactions per {+cluster+}.

.. _atlas_2022_0824:

24 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~~

- Supports {+az-pl+} for {+Serverless-instances+}.
- Enhancements to the |service| billing experience for
  :ref:`tax invoices <atlas-international-tax>`.

.. _atlas_2022_0803:

3 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces 
  `analytics node tiers <https://www.mongodb.com/docs/atlas/cluster-config/multi-cloud-distribution/#select-a-cluster-tier-for-your-analytics-nodes>`__.
- Adds support for VPC peering for Prometheus monitoring integration.
- Adds support for VPC peering for `Live Migrate (Push) <https://www.mongodb.com/docs/atlas/import/migrate-from-com-rs/#support-for-vpc-peering-and-vpc-private-endpoints>`__.
- Disallows |service| {+clusters+} on MongoDB 5.0+ from configuring a default 
  read concern of ``available``.

.. _atlas_20220719:

19 July 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces the General Availability of 
  MongoDB 6.0.

.. _atlas_20220601:

01 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`using GitHub credentials <github-accounts>` to sign 
  in to MongoDB Cloud.

- Adds support for MongoDB 6.0 Release Candidate. |service| will upgrade
  the cluster to the stable release version when it is generally 
  available.

  To learn more about the changes in MongoDB 6.0, see the
  :v6.0:`Release Notes </release-notes/6.0/>`.

.. _atlas_20220511:

11 May 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds additional privileges to custom database roles.
- Adds the ``OPLOG_REPLICATION_LAG_TIME`` host measurement series to
  the :oas-bump-atlas-op:`Measurements Administration API resource 
  <returnmeasurementsforonemongodbprocess>`.
- Updates PagerDuty integration to use the
  `PagerDuty Events API v2 <https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgw-events-api-v2-overview>`__.

.. _atlas_20220420:

20 April 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports new |aws| :ref:`region <amazon-aws>`: ``ap-southeast-3`` 
  (Jakarta, Indonesia).
- Supports new |gcp| :ref:`region <google-gcp>`: ``southamerica-west1`` 
  (Santiago, Chile).
- Supports new |azure| :ref:`regions <microsoft-azure>`:
 
  - ``australiacentral`` (Canberra, Australia)
  - ``australiacentral2`` (Canberra, Australia)
  - ``francesouth`` (Marseille, France)
  - ``norwaywest`` (Stavanger, Norway)
  - ``swedencentral`` (Gävle, Sweden)
  - ``swedensouth`` (Staffanstorp, Sweden)
  - ``southafricawest`` (Cape Town, South Africa)
  - ``brazilsoutheast`` (Rio de Janeiro, Brazil)
  - ``westus3`` (Arizona, USA)
   
- Introduces deploying Low-CPU |service| {+clusters+} into additional
  |gcp| regions:
 
  - ``europe-west3`` (Frankfurt, Germany)
  - ``europe-west6`` (Zurich, Switzerland)
  - ``northamerica-northeast1`` (Montreal, Canada)
  - ``northamerica-northeast2`` (Toronto, Canada)
  - ``asia-east2`` (Hong Kong, China)
  - ``asia-northeast2`` (Osaka, Japan)
  - ``asia-northeast3`` (Seoul, South Korea)
  - ``asia-southeast2`` (Jakarta, Indonesia)
  - ``europe-north1`` (Finland)
  - ``asia-south1`` (Mumbai, India)
  - ``southamerica-east1`` (São Paulo, Brazil)
  - ``us-west3`` (Salt Lake City, UT, USA)
  - ``us-west4`` (Las Vegas, NV, USA)
   
- Spreads newly deployed {+clusters+} in the following |azure| regions 
  across three :ref:`availability zones <microsoft-azure-availability-zones>`:
 
  - ``brazilsouth`` (São Paulo, Brazil)
  - ``eastasia`` (Hong Kong, China)
  - ``norwayeast`` (Oslo, Norway)
  - ``centralindia`` (Pune, India)
  - ``koreacentral`` (Seoul, South Korea)
   
- Spreads newly deployed {+clusters+} in the following |aws| regions 
  across three :ref:`availability zones 
  <amazon-aws-availability-zones>`:

  - ``ca-central-1`` (Montreal, QC, Canada)
  - ``ap-south-1`` (Mumbai, India)
  - ``ap-northeast-2`` (Seoul, South Korea)
  - ``sa-east-1`` (São Paulo, Brazil)
  - ``ap-northeast-1`` (Tokyo, Japan)

- Supports :ref:`online archive data expiration 
  <config-online-archive>`. This feature is in preview.

- Fixes existing behavior where Metrics Chart only shows the duration
  for which data is available.

.. _atlas_20220331:

31 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds support for :oas-bump-atlas-op:`upgrading shared tiers 
  <upgradegroupsharedcluster>` through the |service| Administration
  API.
- Adds support for :oas-bump-atlas-op:`managing project settings 
  <updateprojectsettings>` through the |service| Administration
  API.

.. _atlas_20220309:

9 March 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces a :ref:`metrics integration with Prometheus <prometheus-integration>`.
- Introduces a new :authrole:`Project Search Index Editor` role to manage |fts| indexes using the |service| UI or Administration API.
- Introduces the ability to :oas-bump-atlas-tag:`configure Federated 
  Authentication with the Atlas Administration API 
  <federated-authentication>`.
- Introduces the :ref:`M140 and M250 cluster tiers in all GCP regions <google-gcp>`. 

.. _atlas_20220216:

16 February 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Upgrades free (``M0``) and shared (``M2`` and ``M5``) clusters to 
  MongoDB 5.0.
- Defaults new clusters to MongoDB 5.0.

.. _atlas_20220126:

26 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for the Toronto, Canada (``NORTH_AMERICA_NORTHEAST_2``)
  :doc:`Google Cloud region </reference/google-gcp/>`.
- Introduces an 
  :doc:`alerts integration with Microsoft Teams 
  </tutorial/integrate-msft-teams/>`.
- Increases the memory for new ``M30`` to ``M200`` for Google Cloud 
  clusters.

.. _atlas_20220119:

19 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for :manual:`MongoDB 5.2 </../v5.2/reference/versioning/#rapid-releases>`.

.. _atlas_20220105:

05 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Improves the credits table in the Cloud Billing console.
- Changes how the MongoDB Agent rotates ``mongosqld`` logs to copy and
  truncate.
