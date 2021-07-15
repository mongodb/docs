.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - country
     - string
     - Required
     - |iso3166-1a2| country code of the country in which the |service|
       user resides.

   * - emailAddress
     - string
     - Required
     - Email address that the |service| user possesses.

   * - firstName
     - string
     - Required
     - First or given name that identifies the |service| user.

   * - lastName
     - string
     - Required
     - Last name, family name, or surname that identifies the |service|
       user.

   * - mobileNumber
     - string
     - Optional
     - Mobile or cell phone number that the |service| user possesses.

   * - password
     - string
     - Required
     - String of eight or more characters that authenticates the
       |service| user specified with **username**. 

       .. include:: /includes/fact-atlas-password-requirements.rst

       You can't update the password after it has been created. The
       user must log into |service| to
       :doc:`update their password </security/manage-your-mongodb-atlas-account>`.

   * - roles
     - array
     - Required
     - List of |service| :ref:`organizations` or :ref:`projects` to
       which you assigned the |service| user *and* the |service|
       :ref:`role <user-roles>` has for the associated organization or
       project. You can specify *either* **roles.orgId** or
       **roles.groupId** per entry.

   * - roles.groupId
     - string
     - Required
     - Unique 24-hexidecimal digit string that identifies the project
       in which the user has the specified **roles.roleName**.

   * - roles.orgId
     - string
     - Required
     - Unique 24-hexidecimal digit string that identifies the
       organization in which the user has the specified
       **roles.roleName**.

   * - roles.roleName
     - string
     - Required
     - Label that identifies the assigned grouping of |service|
       privileges.

       When associated to **roles.orgId**, the valid roles and their
       mappings include:

       .. list-table::
          :widths: 40 60
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
       mappings include:

       .. list-table::
          :widths: 40 60
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

   * - username
     - string
     - Required
     - Email address that identifies the |service| user in
       :rfc:`RFC 5322 format <5322#section-3.4.1>` You can't modify the
       username after it has been created.
