.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - username
     - string
     - Username of the |mms| user. Must be a valid email address.

   * - password
     - string
     - Password of the |mms| user.

       .. note::

          This field is *not* included in the entity returned from the
          server. It can only be sent in the entity body when creating
          a new user.

   * - emailAddress
     - string
     - Email address of the |mms| user.

   * - mobileNumber
     - string
     - Mobile telephone number of the |mms| user.

   * - firstName
     - string
     - First name of the |mms| user.

   * - lastName
     - string
     - Last name of the |mms| user.

   * - country
     - string
     -  Primary country where the |mms| user is based. Must match 
        a two-letter |iso3661|.  

   * - roles
     - object array
     - Role assignments of the |mms| user.

   * - roles.orgId
     - string
     - Unique identifier of the organization in which the |mms| user
       has the specified role.

   * - roles.groupId
     - string
     - Unique identifier of the group in which the |mms| user has the
       specified role.

   * - roles.roleName
     - string
     - Name of the role. Accepted values are:

       .. include:: /includes/extracts/list-api-user-roles.rst
    