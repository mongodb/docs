.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``desc``
     - string
     - Description of this Project |api| key.

   * - ``id``
     - string
     - Unique identifier for this Project |api| key.

   * - ``privateKey``
     - string
     - Redacted private key for this Project |api| key.

   * - ``publicKey``
     - string
     - Public key for this Project |api| key.

   * - ``roles``
     - object array
     - Roles that this Project |api| key has. This array returns
       all the Organization and Project roles the user has in either
       |service| or |mms|.

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
       has in either |service| or |mms|. Possible values are:

       ** Organization Roles**

       .. include:: /includes/api/lists/org-roles.rst

       ** Project Roles**

       .. include:: /includes/api/lists/project-roles.rst
