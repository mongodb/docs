.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

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

       .. note:: This key displays unredacted when first created.

   * - ``publicKey``
     - string
     - Public key for this Organization |api| key assigned to this
       Project.

   * - ``roles``
     - array of objects
     - Roles that this Organization |api| key assigned to this Project
       has. This array returns all the Organization and Project roles
       the user has in |service|.

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
       has in |service|. Possible values are:

       **Organization Roles**

       If this is an ``roles.orgId`` (Organization), values include:

       .. include:: /includes/api/lists/org-roles.rst

       **Project Roles**

       If this is an ``roles.groupId`` (Project), values include:

       .. include:: /includes/api/lists/project-roles.rst
