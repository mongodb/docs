The following table lists the current support status for :ref:`VPC peering <vpc-peering>`
and :ref:`private endpoints <private-endpoint>` for source and destination
{+clusters+} that you live migrate to |service|.
Select the tab for replica sets or sharded {+clusters+}.

.. tabs::

   .. tab:: Replica Sets
      :tabid: replica

      .. list-table::
         :widths: 20 20 60
         :header-rows: 1

         * - Cloud Provider
           - VPC Peering
           - Private Endpoints

         * - |azure|
           - :icon-fa5:`check`
           - :icon-fa5:`check`
  
         * - |aws|
           - :icon-fa5:`check`
           - :icon-fa5:`check`

         * - |gcp|
           - :icon-fa5:`check`
           - :icon-fa5:`check`

   .. tab:: Sharded Clusters
      :tabid: sharded

      .. list-table::
         :widths: 20 20 60
         :header-rows: 1

         * - Cloud Provider
           - VPC Peering
           - Private Endpoints

         * - |azure|
           - :icon-fa5:`minus`
           - :icon-fa5:`check`
  
         * - |aws|
           - :icon-fa5:`minus`
           - :icon-fa5:`check`

         * - |gcp|
           - :icon-fa5:`minus`
           - :icon-fa5:`check`

