.. step:: Clean Up After the Migration

   Some features and services will not continue to work after a
   migration and must be reconfigured. If you use any of these
   features, follow the clean up steps below to restore
   functionality:

   .. list-table::
      :header-rows: 1

      * - Feature
        - Clean Up Steps

      * - :ref:`VPC Private Endpoints <private-endpoints>`
        - VPC Private Endpoints are region-specific. After
          migrating to a new region, you must create new VPC
          Private Endpoints in the new region and update your
          application to use the new endpoints.

          You cannot use VPC Private Endpoints if you migrated
          to a global deployment or to a local region in Azure
          or GCP.
      * - Sending Requests
        - Once migration is complete, you must send requests
          using new URLs, if applicable. 
