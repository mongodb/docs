.. _atlas_2022_0914:

14 September 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ``enableSharding`` privilege to custom database roles.
- Adds the ability to set the 
  `maximum lifetime <https://www.mongodb.com/docs/atlas/cluster-additional-settings/#set-transaction-lifetime>`__
  of multi-document transactions per cluster.

.. _atlas_2022_0824:

24 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~~

- Supports Azure Private Link connections for Atlas serverless 
  instances.
- Enhancements to the Atlas billing experience for tax invoices.

.. _atlas_2022_0803:

3 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces 
  `analytics node tiers <https://www.mongodb.com/docs/atlas/cluster-config/multi-cloud-distribution/#select-a-cluster-tier-for-your-analytics-nodes>`__.
- Adds support for VPC peering for Prometheus monitoring integration.
- Adds support for VPC peering for `Live Migrate (Push) <https://www.mongodb.com/docs/atlas/import/migrate-from-com-rs/#support-for-vpc-peering-and-vpc-private-endpoints>`__.
- Disallows Atlas clusters on MongoDB 5.0+ from configuring a default 
  read concern of ``available``.

.. _atlas_20220719:

19 July 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces the General Availability of 
  :ref:`MongoDB 6.0 <release-notes-6.0>`.

.. _atlas_20220601:

01 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces the General Availability of |service|  
  :ref:`{+serverless-instances+} <atlas-choose-serverless>`, which 
  includes the following changes:

  - Supports :ref:`{+aws-pl+} connections <private-endpoint>`
  - Adds :ref:`continuous backup <serverless-snapshots>`
  - Reduces :ref:`RPU and WPU pricing <serverless-instance-costs>`

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
  the :oas-atlas-op:`Measurements Administration API resource 
  </returnMeasurementsForOneMongodbProcess>`.
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
  - ``swedensouth`` (Staffanstrop, Sweden)
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
  across three availability :ref:`availability zones 
  <microsoft-azure-availability-zones>`:
 
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

- Adds support for :oas-atlas-op:`upgrading shared tiers 
  </upgradeOneTenantCluster>` through the |service| Admin 
  API.
- Adds support for :oas-atlas-op:`managing project settings 
  </patchGroupSettings>` through the |service| Admin 
  API.

.. _atlas_20220309:

9 March 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces a :ref:`metrics integration with Prometheus <prometheus-integration>`.
- Introduces a new :authrole:`Project Search Index Editor` role to manage |fts| indexes using the |service| UI or Administration API.
- Introduces the ability to :oas-atlas-tag:`configure Federated 
  Authentication with the Atlas Administration API 
  </Federated-Authentication>`.
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
