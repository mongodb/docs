.. list-table::
   :widths: 20 60 20
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description
     - Cloud Provider

   * - Inactive
     - |service| is not using the Whitelist entry. No cloud
       provider containers are provisioned for the project.
     - All

   * - Pending
     - |service| is configuring the Whitelist entry for the project.
     - All

   * - Active
     - |service| can use the whitelist entry with every container
       provisioned for the project.
     - All

   * - Active in regions: <regions>
     - |service| can use the whitelist entry for the regions listed,
       but not any other containers that exist for the project.
     - AWS

   * - Failed
     - |service| could not configure the whitelist entry for every
       container provisioned for the project.
     - All
