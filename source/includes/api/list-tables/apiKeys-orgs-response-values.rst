.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``desc``
     - string
     - Description of this Organization |api| key.

   * - ``id``
     - string
     - Unique identifier for this Organization |api| key.

   * - ``links``
     - string
     - An array of documents, representing a :ref:`link <atlas-api-linking>`
       to one or more sub-resources and/or related resources such as
       :ref:`list pagination <atlas-api-lists>`. See :ref:`api-linking` for
       more information.

   * - ``privateKey``
     - string
     - Redacted Private key for this Organization |api| key.

       .. note:: This key displays unredacted when first created.


   * - ``publicKey``
     - string
     - Public key for this Organization |api| key.

   * - ``roles``
     - object array
     - Roles that this Organization |api| key has. This array returns
       all the Organization and Project roles the user has in
       |service|.

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

       If this is an ``roles.orgId`` (organization), values include:

       .. include:: /includes/api/lists/org-roles.rst

       **Project Roles**

       If this is a ``roles.groupId`` (project), values include:

       .. include:: /includes/api/lists/project-roles.rst
