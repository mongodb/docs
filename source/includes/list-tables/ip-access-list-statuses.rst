.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1

   * - Status
     - Description

   * - Inactive
     - |service| is not using the IP access list entry. No cloud
       provider containers are provisioned for the project.

   * - Pending
     - |service| is configuring the IP access list entry for the
       project.

   * - Active
     - |service| has configured the IP access list entry for every
       container provisioned in the project.

   * - Active in regions: <regions>
     - |service| has configured the IP access list entry for every
       container provisioned in the project for the regions listed, but
       not any other containers that exist for the project. This
       applies to |aws| security groups only.

   * - Failed
     - |service| could not configure the IP access list entry for every
       container provisioned for the project.
