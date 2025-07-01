The **balancer** object is optional and defines balancer settings for each cluster.

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
     - Parameters named according to clusters, each parameter
       containing an object with the desired balancer settings for the
       cluster. The object uses the **stopped** and **activeWindow**
       parameters, as described in the procedure to schedule the
       balancing window in
       :manual:`this tutorial </tutorial/manage-sharded-cluster-balancer>`
       in the MongoDB manual.
