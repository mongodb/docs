You can deploy the following {+database-deployments+} from this page:

{+Flex-Clusters+}
  {+Flex-clusters+} are low-cost cluster types suitable for teams 
  who are learning MongoDB or developing small proof-of-concept applications.
  You can begin your project with an {+Atlas-Flex+} cluster and upgrade to 
  a production-ready {+Dedicated-cluster+} tier at a future time. {+Flex-clusters+} 
  are more limited than Dedicated clusters. For information on these limitations, 
  refer to :ref:`<flex-limits-config>`.

  .. include:: /includes/shared-to-atlas-flex-migration.rst

  .. include:: /includes/serverless-to-atlas-flex-migration.rst

{+Dedicated-clusters+}
  {+Dedicated-clusters+} include M10 and higher tiers. The
  M10 and M20 tiers are suitable for development environments
  and low-traffic applications, while higher tiers can handle large
  datasets and high-traffic applications. Dedicated clusters can be
  deployed into a single geographical region or multiple geographical 
  regions.

  .. note::

     If you choose to create a {+Dedicated-cluster+}, you also have the option 
     to Create a Global Cluster. For more information, refer to 
     :ref:`Manage Global Clusters <global-clusters>`.

{+Free-clusters+}
  A {+Free-cluster+} provides a free sandbox replica set. You can deploy 
  one M0 {+cluster+} per |service| project. Free clusters are more 
  limited than {+Atlas-Flex+} and Dedicated clusters. For information on 
  these limitations, refer to :ref:`<shared-limits-config>`.
      