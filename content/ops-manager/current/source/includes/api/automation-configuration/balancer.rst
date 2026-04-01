The **balancer** object is optional and defines balancer settings
for each cluster.

.. code-block:: json
   :linenos:

   "balancer": {
     "<clusterName1>": {},
     "<clusterName2>": {},
     ...
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - balancer
     - object
     - Optional
     - Parameters named for each cluster, where each parameter
       contains an object with the balancer settings for that
       cluster. The object uses the **stopped** and
       **activeWindow** parameters. To learn more, see
       :manual:`Manage Sharded Cluster Balancer
       </tutorial/manage-sharded-cluster-balancer>`
       in the MongoDB manual.
