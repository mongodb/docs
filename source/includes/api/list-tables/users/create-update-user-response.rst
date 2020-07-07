.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - ``Name``
     - Type
     - Description

   * - ``emailAddress``
     - string
     - Email address of the |mms| user.

   * - ``firstName``
     - string
     - First name of the |mms| user.

   * - ``id``
     - string
     - Unique identifier of the |mms| user.

   * - ``lastName``
     - string
     - Last name of the |mms| user.

   * - ``links``
     - object array
     - Links to related sub-resources. All ``links`` arrays in
       responses include at least one link called self. The
       relationship between URLs are explained in the
       :rfc:`Web Linking Specification <5988>`.

   * - ``mobileNumber``
     - string
     - Mobile number of the |mms| user.

   * - ``roles``
     - object array
     - Role assigned to the |mms| user.

   * - | ``roles``
       | ``.groupId``
     - string
     - Unique identifier for the project in which the user has the
       specified role.

       .. cond:: onprem

           Roles that start with ``GLOBAL_`` don't require a
           ``groupId``. These roles aren't tied to a project.

   * - | ``roles``
       | ``.orgId``
     - string
     - Unique identifier for the organization in which the user has
       the specified role.

   * - | ``roles``
       | ``.roleName``
     - string
     - Name of the role. Accepted values are:

       .. cond:: cloud

          .. note::

             The ``users`` resource returns all the roles the user
             has in both |mms| and |service|.

          .. include:: /includes/list-tables/api-user-roles-cloud.rst

       .. cond:: onprem

          .. include:: /includes/list-tables/api-user-roles-onprem.rst

   * - ``username``
     - string
     - Username of the |mms| user.
