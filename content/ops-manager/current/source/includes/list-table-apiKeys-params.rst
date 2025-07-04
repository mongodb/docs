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

       .. include:: /includes/org-and-project-roles.rst