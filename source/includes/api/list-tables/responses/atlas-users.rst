.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Response Parameter
     - Type
     - Required
     - Description

   * - country
     - string
     - Required
     - |iso3166-1a2| country code of the |service| user's country of
       residence.

   * - emailAddress
     - string
     - Required
     - |service| user's email address.

   * - firstName
     - string
     - Required
     - |service| user's first name.

   * - id
     - string
     - Required
     - Unique identifier for the |service| user.

   * - lastName
     - string
     - Required
     - |service| user's last name.

   * - links
     - array of objects
     - Required
     - .. include:: /includes/links-explanation.rst

   * - mobileNumber
     - string
     - Required
     - |service| user's mobile or cell phone number, if it is listed in
       the user's profile.

   * - password
     - string
     - Required
     - Password. |service| doesn't return this parameter except in
       response to creating a new user.

       You cannot update the password via API once set. The user
       must log into |service| and update their password from the
       |service| console.

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
            - :authrole:`Project Data AccesRead Only`
   * - teamIds
     - array of strings
     - Required
     - Unique identifiers for each :ref:`team <manage-teams>` to which
       the user belongs.

   * - username
     - string
     - Required
     - |service| username. Must use email address formatting. You
       cannot modify the username once set.
