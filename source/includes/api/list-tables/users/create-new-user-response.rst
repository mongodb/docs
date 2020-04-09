.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``apiKey``
     - string
     - Personal |API| Key of the new |mms| user.

   * - ``programmaticApiKey``
     - object
     - Details of the first programmatic |api| key created in |mms|.

   * - | ``programmaticApiKey``
       | ``.desc``
     - string
     - Description of the first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.id``
     - string
     - Unique identifier of the first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - | ``programmaticApiKey``
       | ``.privateKey``
     - string
     - Six alphanumeric characters that serve as the new |mms| username
       of the first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.publicKey``
     - string
     - Six alphanumeric characters that serve as the new |mms| username
       of the first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.roles``
     - array of objects
     - :doc:`Roles </reference/user-roles>` assigned to the first
       programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.roles.roleName``
     - string
     - Name of the assigned role. Accepted returned values are:

       .. cond:: cloud

          .. note::

             The ``users`` resource returns all the roles the new |mms|
             user has in both |mms| and |service|.

       .. include:: /includes/list-tables/api-user-roles-onprem.rst

   * - ``user``
     - object
     - Details of the new |mms| user.

   * - | ``user``
       | ``.emailAddress``
     - string
     - Email address of the new |mms| user.

   * - | ``user``
       | ``.firstName``
     - string
     - First name of the new |mms| user.

   * - | ``user``
       | ``.id``
     - string
     - Unique identifier of the new |mms| user.

   * - | ``user``
       | ``.lastName``
     - string
     - Last name of the new |mms| user.

   * - | ``user``
       | ``.links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - | ``user``
       | ``.mobileNumber``
     - string
     - Mobile number of the new |mms| user.

   * - | ``user``
       | ``.roles``
     - array of objects
     - :doc:`Roles </reference/user-roles>` assigned to the new |mms|
       user.

   * - | ``user``
       | ``.roles.groupId``
     - string
     - Unique identifier for the project in which the new |mms| user
       has the specified role.

       .. cond:: onprem

          For the :ref:`global roles <global-roles>`, no ``groupId``
          exists as these roles are not tied to an organization or
          project.

   * - | ``user``
       | ``.roles.orgId``
     - string
     - Unique identifier for the organization in which the new |mms|
       user has the specified role.

   * - | ``user``
       | ``.roles.roleName``
     - string
     - Name of the role. Values are:

       .. cond:: cloud

          .. note::

             The ``users`` resource returns all the roles the new |mms|
             user has in both |mms| and |service|.

       .. include:: /includes/list-tables/api-user-roles-onprem.rst

   * - | ``user``
       | ``.teamIds``
     - array of strings
     - List of unique identifiers for the teams to which the new |mms|
       user belongs.

   * - | ``user``
       | ``.username``
     - string
     - Username of the new |mms| user.
