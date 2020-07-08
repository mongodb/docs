The ``balancer`` object is optional and defines balancer settings for each cluster.

.. code-block:: cfg

   "balancer": {
       "<clusterName1>": <object>,
       "<clusterName2>": <object>,
       ...
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``balancer``
     - object
     - *Optional*. This object contains fields named according to
       clusters, each field containing an object with the desired
       balancer settings for the cluster. The object uses the
       ``stopped`` and ``activeWindow`` fields, as described in the
       procedure to schedule the balancing window :manual:`in this
       tutorial </tutorial/manage-sharded-cluster-balancer>` in the
       MongoDB manual.
