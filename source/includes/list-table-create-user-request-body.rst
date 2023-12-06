.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - username
     - string
     - Username of the |mms| user. Validated depending on the 
       value of the :setting:`mms.email.validation` property:

       .. include:: /includes/list-table-api-email-validation-options.rst
            
       See :setting:`mms.email.validation` for details.

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

       For the "global" roles (those whose name starts
       with ``GLOBAL_``) there is no ``groupId`` since these
       roles are not tied to a group.

   * - roles.roleName
     - string
     - Name of the role. Accepted values are:


       .. include:: /includes/extracts/list-api-user-roles.rst

