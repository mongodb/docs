.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``desc``
     - string
     - Description of this Global |api| Key.

   * - ``id``
     - string
     - Unique identifier for this Global |api| Key.

   * - ``links``
     - string
     - An array of documents, representing a :ref:`link <api-linking>`
       to one or more sub-resources and/or related resources such as
       :ref:`list pagination <api-lists>`. See :ref:`api-linking` for
       more information.

   * - ``privateKey``
     - string
     - Unredacted Private key for this Global |api| Key.

   * - ``publicKey``
     - string
     - Public key for this Global |api| Key.

   * - ``roles``
     - object array
     - Roles that this Global |api| Key has. This array returns
       all the Global roles the user has in |mms|.

   * - ``roles.roleName``
     - string
     - Name of the role. This resource returns all the roles the user
       has in |mms|. Possible values are:

       .. include:: /includes/api/lists/global-roles.rst
