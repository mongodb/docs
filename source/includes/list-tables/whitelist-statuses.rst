.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description

   * - Inactive
     - |service| is not using the Whitelist entry. No cloud
       provider containers are provisioned for the project.

   * - Pending
     - |service| is configuring the Whitelist entry for the project.

   * - Active
     - |service| can use the whitelist entry with every container
       provisioned for the project.

   * - Active in regions: <regions>
     - |service| can use the whitelist entry for the regions listed,
       but not any other containers that exist for the project.

   * - Failed
     - |service| could not configure the whitelist entry for every
       container provisioned for the project.
