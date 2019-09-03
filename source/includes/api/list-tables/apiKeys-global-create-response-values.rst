.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``created``
     - string
     - |Epoch-time| when you created this Global |api| Key.

   * - ``desc``
     - string
     - Description of this Global |api| Key.

   * - ``globalRoles``
     - string array
     - Global roles that you assigned to this Global |api| Key.
       Accepted values include:

       .. include:: /includes/api/lists/global-roles.rst

   * - ``numGroups``
     - integer
     - Number of projects related to the ``groupRoles``.

   * - ``orgRoles``
     - string array
     - Organization roles that you assigned to this Global |api| Key.
       Accepted values include:

       .. include:: /includes/api/lists/org-roles.rst

   * - ``groupRoles``
     - string array
     - Project roles that you assigned to this Global |api| Key.
       Accepted values include:

       .. include:: /includes/api/lists/project-roles.rst

   * - ``privateKey``
     - string
     - Redacted Private key for this Global |api| Key.

       .. note:: This key displays unredacted when first created.

   * - ``userId``
     - string
     - Unique identifier for this Global |api| Key.

   * - ``username``
     - string
     - Public Key for this Global |api| Key.
