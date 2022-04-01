.. _atlas_20220331:

31 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds support for :ref:`upgrading shared tiers 
  <upgrade-one-shared-tier-cluster-ref>` through the |service| Admin 
  API.
- Adds support for :ref:`managing project settings 
  <atlas-update-one-project-settings-api>` through the |service| Admin 
  API.

.. _atlas_20220309:

9 March 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces a :ref:`metrics integration with Prometheus <prometheus-integration>`.
- Introduces a new :authrole:`Project Search Index Editor` role to manage |fts| indexes using the |service| UI or Administration API.
- Introduces the ability to :doc:`configure Federated Authentication with the Atlas Administration API </reference/api/federation-configuration/>`.
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
