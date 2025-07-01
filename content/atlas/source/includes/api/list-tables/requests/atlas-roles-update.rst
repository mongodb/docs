.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Response Parameter
     - Type
     - Required
     - Description

   * - roles
     - array of objects
     - Required
     - Each object in the array represents either an |service|
       :ref:`organization <organizations>` or
       :ref:`project <projects>` the |service| user is assigned to
       *and* the |service| :ref:`role <user-roles>` has for
       the associated organization or project. You can specify *either*
       **roles.orgId** or **roles.groupId** per object.

   * - roles.groupId
     - string
     - Required
     - unique identifier of the project in which the user has the
       specified **roles.roleName**.

   * - roles.orgId
     - string
     - Required
     - unique identifier of the organization in which the user has the
       specified **roles.roleName**.

   * - roles.roleName
     - string
     - Required
     - name of the role.

       When associated to **roles.orgId**, the valid roles and their
       mappings are:

       .. list-table::
          :widths: 20 80
          :header-rows: 1
          :stub-columns: 1

          * - Role
            - Mapping

          * - ORG_OWNER
            - :authrole:`Organization Owner`
          * - ORG_GROUP_CREATOR
            - :authrole:`Organization Project Creator`
          * - ORG_BILLING_ADMIN
            - :authrole:`Organization Billing Admin`
          * - ORG_READ_ONLY
            - :authrole:`Organization Read Only`
          * - ORG_MEMBER
            - :authrole:`Organization Member`

       When associated to **roles.groupId**, the valid roles and their
       mappings are:

       .. list-table::
          :widths: 20 80
          :header-rows: 1
          :stub-columns: 1

          * - Role
            - Mapping

          * - GROUP_OWNER
            - :authrole:`Project Owner`
          * - GROUP_CLUSTER_MANAGER
            - :authrole:`Project Cluster Manager`
          * - GROUP_READ_ONLY
            - :authrole:`Project Read Only`
          * - GROUP_DATA_ACCESS_ADMIN
            - :authrole:`Project Data Access Admin`
          * - GROUP_DATA_ACCESS_READ_WRITE
            - :authrole:`Project Data Access Read/Write`
          * - GROUP_DATA_ACCESS_READ_ONLY
            - :authrole:`Project Data Access Read Only`
