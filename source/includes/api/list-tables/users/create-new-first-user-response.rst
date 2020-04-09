.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``apiKey``
     - string
     - Thirty-one alphanumeric characters and dashes that serve as the
       password for the personal |api| Key of the first |mms| user.

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
     - Thirty-one alphanumeric characters and dashes that serve as the
       password of the first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.publicKey``
     - string
     - Six alphanumeric characters that serve as the username of the
       first programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.roles``
     - array of objects
     - :doc:`Roles </reference/user-roles>` assigned to the first
       programmatic |api| key.

   * - | ``programmaticApiKey``
       | ``.roles.roleName``
     - string
     - Name of the assigned role. |mms| grants the first programmatic
       |api| key the :authrole:`Global Owner` role (``GLOBAL_OWNER``).

   * - ``user``
     - object
     - Details of the first |mms| user.

   * - | ``user``
       | ``.emailAddress``
     - string
     - Email address of the first |mms| user.

   * - | ``user``
       | ``.firstName``
     - string
     - First name of the first |mms| user.

   * - | ``user``
       | ``.id``
     - string
     - Unique identifier of the first |mms| user.

   * - | ``user``
       | ``.lastName``
     - string
     - Last name of the first |mms| user.

   * - | ``user``
       | ``.links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - | ``user``
       | ``.mobileNumber``
     - string
     - Mobile number of the first |mms| user.

   * - | ``user``
       | ``.roles``
     - array of objects
     - :doc:`Roles </reference/user-roles>` assigned to the first |mms|
       user.

   * - | ``user``
       | ``.roles.roleName``
     - string
     - Name of the assigned role. |mms| grants the first |mms| user the
       :authrole:`Global Owner` role (``GLOBAL_OWNER``).

   * - | ``user``
       | ``.teamIds``
     - array of strings
     - List of unique identifiers for the teams to which the first
       |mms| user belongs.

   * - | ``user``
       | ``.username``
     - string
     - Username of the first |mms| user.
