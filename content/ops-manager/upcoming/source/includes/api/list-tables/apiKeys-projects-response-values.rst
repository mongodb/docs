.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``desc``
     - string
     - Description of this Organization |api| key assigned to this
       Project.

   * - ``id``
     - string
     - Unique identifier for this Organization |api| key assigned to
       this Project.

   * - ``privateKey``
     - string
     - Redacted Private key for this Organization |api| key assigned to
       this Project.

       **This key displays unredacted when first created.**

   * - ``publicKey``
     - string
     - Public key for this Organization |api| key assigned to this Project.

   * - ``roles``
     - object array
     - Roles that this Organization |api| key assigned to this Project
       has. This array returns all the Organization and Project roles
       the user has in |mms|.

   * - ``roles.groupId``
     - string
     - Unique identifier of the Project to which this role belongs.

   * - ``roles.orgId``
     - string
     - Unique identifier of the Organization to which this role
       belongs.

   * - ``roles.roleName``
     - string
     - Name of the role. This resource returns all the roles the user
       has in |mms|. Possible values are:

       **Organization Roles**

       If this is an ``roles.orgId`` (Organization), values include:

       - ``ORG_OWNER``: :authrole:`Organization Owner`

       - ``ORG_MEMBER``: :authrole:`Organization Member`

       - ``ORG_GROUP_CREATOR``: :authrole:`Organization Project
         Creator`

       - ``ORG_READ_ONLY``: :authrole:`Organization Read Only`

       **Project Roles**

       If this is an ``roles.groupId`` (Project), values include:

       - ``GROUP_AUTOMATION_ADMIN``: :authrole:`Project Automation
         Admin`

       - ``GROUP_BACKUP_ADMIN``: :authrole:`Project Backup Admin`

       - ``GROUP_DATA_ACCESS_ADMIN``: :authrole:`Project Data Access
         Admin`

       - ``GROUP_DATA_ACCESS_READ_ONLY``: :authrole:`Project Data
         Access Read Only`

       - ``GROUP_DATA_ACCESS_READ_WRITE``: :authrole:`Project Data
         Access Read/Write`

       - ``GROUP_MONITORING_ADMIN``: :authrole:`Project Monitoring
         Admin`

       - ``GROUP_OWNER``: :authrole:`Project Owner`

       - ``GROUP_READ_ONLY``: :authrole:`Project Read Only`

       - ``GROUP_USER_ADMIN``: :authrole:`Project User Admin`
