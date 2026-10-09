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
     - An array of documents that represents a
       :ref:`link <api-linking>` to one or more sub-resources or
       related resources such as :ref:`list pagination <api-lists>`.
       See :ref:`api-linking` for more information.

   * - ``privateKey``
     - string
     - Redacted private key for this Global |api| Key.

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

       - ``GLOBAL_AUTOMATION_ADMIN``:
         :authrole:`Global Automation Admin`

       - ``GLOBAL_BACKUP_ADMIN``: :authrole:`Global Backup Admin`

       - ``GLOBAL_MONITORING_ADMIN``:
         :authrole:`Global Monitoring Admin`

       - ``GLOBAL_OWNER``: :authrole:`Global Owner`

       - ``GLOBAL_READ_ONLY``: :authrole:`Global Read Only`

       - ``GLOBAL_USER_ADMIN``: :authrole:`Global User Admin`
