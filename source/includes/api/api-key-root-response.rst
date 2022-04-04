.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Field
     - Description

   * - ``desc``
     - User-supplied description of the `programmatic API Key <https://www.mongodb.com/docs/atlas/configure-api-access/#programmatic-api-keys>`_.

   * - ``id``
     - Unique identifier of the programmatic API Key.
   
   * - ``links``
     - Links to resources associated with the programmatic API Key.
   
   * - ``privateKey``
     - The private key of the programmatic API Key used to query this resource.

   * - ``publicKey``
     - The public key for the programmatic API Key used to query this resource.

   * - ``roles[]``
     - Array of `organization roles <https://www.mongodb.com/docs/atlas/reference/user-roles/#organization-roles>`_.
       assigned to the programmatic API Key used to query this resource.

   * - ``roles[i].orgId``
     - The unique identifer of the project associated with the programmatic API Key.

   * - ``roles[i].roleName``
     - The organization role associated with the programmatic API Key.

   * - ``roles[i].groupId``
     - The |service| project to which the organization role 
       has privileges.

   * - ``roles[i].roleName``
     - The organization role assigned to the programmatic API Key.
       The ``users`` resource returns all roles assigned to the
       user in |service|. Possible values are:
  
       .. include:: /includes/organization-roles.rst

  