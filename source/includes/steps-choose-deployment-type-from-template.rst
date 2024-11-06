
You can deploy the following {+database-deployments+} from this page:

M10
  The M10 tier is suitable for development environments
  and low-traffic applications, while higher tiers can handle large
  datasets and high-traffic applications. Dedicated clusters can be
  deployed into a single geographical region or multiple geographical 
  regions. 
  
  .. note::
     
     To create {+Dedicated-cluster+} tiers higher than M10, select 
     :guilabel:`Go to Advanced Configuration` at the bottom of the page. 

{+Flex-Clusters+}
  {+Flex-clusters+} are low-cost cluster types suitable for teams 
  who are learning MongoDB or developing small proof-of-concept applications.
  You can begin your project with an {+Atlas-Flex+} cluster and upgrade to 
  a production-ready {+Dedicated-cluster+} tier at a future time.

  .. include:: /includes/shared-to-atlas-flex-migration.rst

  .. include:: /includes/serverless-to-atlas-flex-migration.rst

{+Free-clusters+}
  A {+Free-cluster+} provides a free sandbox replica set. You can deploy 
  one M0 {+cluster+} per |service| project. Free clusters are more 
  limited than {+Atlas-Flex+} and Dedicated clusters. For information on 
  these limitations, refer to :ref:`<shared-limits-config>`.
