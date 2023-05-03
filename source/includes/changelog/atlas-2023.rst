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

- Supports the ability to use the |service| Live Migration Service for 
  MongoDB 6.0 replica set migrations.

.. _atlas_2023_02_15:

15 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports simulating an outage for |service| for regions that contain a majority of database nodes,
  and reconfiguring a {+cluster+} from an unhealthy to a healthy state in the event of such an outage.
- Supports connecting to your database behind private endpoints with an optimized SRV connection string for sharded clusters.
- Adds a streamlined experience for users deploying their first |service| database using templates for best practices.
- Adds EU region support for the PagerDuty integration.
  
.. _atlas_2023_01_25:

25 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

Supports converting {+shared-clusters+} (``M0``, ``M2``, ``M5``) to {+serverless-instances+}.
