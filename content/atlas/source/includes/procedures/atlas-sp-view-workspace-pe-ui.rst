.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the workspace private endpoints for your project.

      a. In the sidebar, click :guilabel:`Private Endpoint`.
      #. Click the :guilabel:`Atlas Stream Processing` tab.

   .. step:: Review the workspace private endpoint details.

      The page displays the following details for each workspace
      private endpoint:

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Column Name
           - Description

         * - :guilabel:`Cloud Provider`
           - The cloud provider that hosts the |vpc| for the private
             endpoint.

         * - :guilabel:`Region`
           - The region where you created the private endpoint.

         * - :guilabel:`Status`
           - The status of the private endpoint:
             
             - ``Available``: The endpoint is active and functioning
               correctly.
             - ``Error``: There was an error in setting up the
               endpoint and it is not operational. 

         * - :guilabel:`VPC ID / Resource ID`
           - The unique identifier of your |aws| |vpc| endpoint.

         * - :guilabel:`Actions`
           - The actions you can take on the private endpoint. You can
             :ref:`delete <atlas-sp-manage-workspace-pe-delete>` the
             endpoint.
