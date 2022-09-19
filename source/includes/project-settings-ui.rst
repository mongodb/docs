You can set the following in the {+atlas-ui+}:

.. list-table::
  :widths: 40 60
  :header-rows: 1

  * - Setting

    - Description

  * - :guilabel:`Project Name`

    - Sets your project's name.

      .. note::

          Only a user with the :authrole:`Project Owner` role for the project or the :authrole:`Organization Owner` role for the project's organization can edit the project name.

  * - :guilabel:`Project Time Zone`

    - Sets your project's time zone. This affects the maintenance window
      timezone and alerts, but not the timezone set for individual user
      accounts. [#user-settings]_
      
      .. note::
        
         There is also a :guilabel:`User Preferences` timezone, which 
         only affects the activity feed.

  * - :guilabel:`Connect via Peering Only (GCP and Azure)`

    - Allows you to enable or disable connections between MongoDB
      Atlas dedicated clusters and public |ipaddr| addresses outside
      of the peered |vpc|/VNet. You can only enable or disable this
      setting when there are no active dedicated GCP or Azure clusters
      in your project.

      .. important:: Feature Deprecated

         This feature has been deprecated. Existing clusters can
         continue to use this feature. Use both Standard and Private
         IP for Peering connection strings to connect to your project.
         These connection strings allow you to connect using both
         |vpc|/VNet Peering and allowed public IP addresses. To
         learn more about support for multiple connection strings, see
         :dochub:`this FAQ <atlas-horizon-faq>`.

  * - :guilabel:`Using Custom DNS on AWS with VPC peering`

    - Allows you to expose a second connection string for your
      dedicated |service| clusters on |aws| that resolves to private IPs.

      Enable this setting if you use custom DNS that cannot take
      advantage of |aws| built-in split-horizon DNS across a VPC peering
      connection.

      .. note::

         |service| displays this setting only when you
         :doc:`enable network peering on AWS </security-vpc-peering>`.

  * - :guilabel:`Multiple Regionalized Private Endpoints`

    - Allows you to create more than one :ref:`Private Endpoint
      <private-endpoint>` in more than one region for multi-region and
      global sharded clusters.

      Enable this setting if you want to connect to multi-region or
      global sharded clusters using private endpoints.

      .. include:: /includes/admonitions/warnings/regionalized-pls-change-connection-strings.rst

      .. include:: /includes/enable-regionalized-privatelink.rst

  * - :guilabel:`Collect Database Specific Statistics`

    - Allows you to enable or disable the collection of database
      statistics in :doc:`cluster metrics </monitor-cluster-metrics>`.

  * - :guilabel:`Set Preferred Cluster Maintenance Start Time`

    - Set which hour of the day that |service| should start weekly
      maintenance on your cluster.

      To learn more about cluster maintenance windows, see
      :ref:`configure-maintenance-window`. 

  * - :guilabel:`Real Time Performance Panel`

    - Allows you to see real time metrics from your MongoDB database.

  * - :guilabel:`Data Explorer`

    - Allows you to query your database with an easy-to-use interface.

      .. important::

         .. include:: /includes/fact-disable-de-limitations.rst

  * - :guilabel:`Performance Advisor and Profiler`

    - Allows you to analyze database logs and receive performance
      improvement recommendations.

  * - :guilabel:`Schema Advisor`

    - Allows you to receive customized recommendations to optimize your
      data model and enhance performance.

      Disable this setting to disable schema suggestions in the
      :ref:`Performance Advisor <performance-advisor>` and the
      :ref:`{+atlas-ui+} <atlas-ui-dbs>`.
      
      .. include:: /includes/fact-serverless-schema-advisor.rst

  * - :guilabel:`Delete Charts`

    - .. include:: /includes/fact-delete-charts-warning.rst
      
      Allows :authrole:`Project Owners <Project Owner>` to delete the
      |charts| instance associated with your project. This setting is
      only visible if you have
      :charts:`created a Charts instance </launch-charts>` for your
      project.

      .. include:: /includes/fact-recreate-charts-instance.rst

  * - :guilabel:`Delete Project`

    - The ``DELETE`` button allows you to delete a project. 

      .. include:: /includes/fact-project-delete-criteria.rst

.. [#user-settings]
  To modify your user settings, click on your user name in the
  upper-right hand corner and select :guilabel:`Account`.