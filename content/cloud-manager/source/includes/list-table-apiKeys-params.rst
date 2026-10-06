.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier for the API key

   * - ``desc``
     - string
     - Description of the API key

   * - ``privateKey``
     - string
     - Redacted private key for the API key

   * - ``publicKey``
     - string
     - Public key for the API key

   * - ``roles``
     - object array
     - Roles that the API key has

   * - ``roles.{ENTITY-ID}``
     - string
     - The ``{ENTITY-ID}`` represents the Organization or Project to
       which this role applies. Possible values are: ``orgId`` or
       ``groupId``.

   * - ``roles.roleName``
     - string
     - The name of the role. The ``users`` resource returns all the roles the
       user has in either |service| or |mms|. Possible values are:

       - Organization Roles

         - ``ORG_OWNER``: :authrole:`Organization Owner`

         - ``ORG_MEMBER``: :authrole:`Organization Member`

         - ``ORG_GROUP_CREATOR``: :authrole:`Organization Project
           Creator`

         - ``ORG_BILLING_ADMIN``: :authrole:`Organization Billing
           Admin`

         - ``ORG_READ_ONLY``: :authrole:`Organization Read Only`

         - ``ORG_BILLING_READ_ONLY``: :authrole:`Organization
           Billing Viewer`

       - Project Roles

         Groups and projects are synonymous terms.

         - ``GROUP_OWNER``
         - ``GROUP_READ_ONLY``
         - ``GROUP_DATA_ACCESS_ADMIN``
         - ``GROUP_DATA_ACCESS_READ_WRITE``
         - ``GROUP_DATA_ACCESS_READ_ONLY``
         - ``GROUP_AUTOMATION_ADMIN``
         - ``GROUP_BACKUP_ADMIN``
         - ``GROUP_MONITORING_ADMIN``
         - ``GROUP_OWNER``
         - ``GROUP_USER_ADMIN``