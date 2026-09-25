You can deploy the following {+database-deployments+} from this page:

{+Flex-Clusters+}
  {+Flex-clusters+} are low-cost cluster types suitable for teams 
  who are learning MongoDB or developing small proof-of-concept applications.
  You can begin your project with an {+Atlas-Flex+} cluster and scale
  the cluster tier to a production-ready {+Dedicated-cluster+} at a
  future time. {+Flex-clusters+}
  are more limited than Dedicated clusters. For information on these limitations, 
  refer to :ref:`<flex-limits-config>`.

{+Dedicated-clusters+}
  {+Dedicated-clusters+} include M10 and higher tiers. The
  M10 and M20 tiers are suitable for development environments
  and low-traffic applications, while higher tiers can handle large
  datasets and high-traffic applications. Dedicated clusters can be
  deployed into a single geographical region or multiple geographical
  regions. In public preview, all nodes in an {+atlas-infinite-cluster+}
  :ref:`deploy in the same region <atlas-infinite-availability>`.

  .. note::

     If you choose to create a {+Dedicated-cluster+} in
     {+atlas-core-full+}, you also have the option to create a Global
     Cluster. For more information, refer to :ref:`Manage Global
     Clusters <global-clusters>`.

     {+atlas-infinite-full+} :ref:`doesn't support global clusters in
     public preview <atlas-infinite-availability>`.

{+Free-clusters+}
  A {+Free-cluster+} provides a free sandbox replica set. You can deploy 
  one {+Free-cluster+} per |service| project. Free clusters are more
  limited than {+Atlas-Flex+} and Dedicated clusters. For information on 
  these limitations, refer to :ref:`<shared-limits-config>`.
      
