.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description

   * - ``actions``
     - array
     - Each object in the ``actions`` array represents an individual
       :manual:`privilege action </reference/privilege-actions/>`
       granted by the role.

   * - ``actions.action``
     - string
     - Name of the privilege action. For a complete list of actions
       available in the {+atlas-admin-api+}, see 
       :doc:`/reference/api/custom-role-actions`.

   * - ``actions.resources``
     - array
     - Contains information on where the action is granted. Each
       object in the array either indicates a database and collection
       on which the action is granted, or indicates that the
       action is granted on the :manual:`cluster resource
       </reference/resource-document/#cluster-resource>`.

   * - ``actions.resources.collection``
     - string
     - Collection on which the action is granted. If this value is an
       empty string, the action is granted on all collections within
       the database specified in the ``actions.resources.db`` field.

       .. note::

          This field is mutually exclusive with the
          ``actions.resources.cluster`` field.

   * - ``actions.resources.db``
     - string
     - Database on which the action is granted.

       .. note::

          This field is mutually exclusive with the
          ``actions.resources.cluster`` field.

   * - ``actions.resources.cluster``
     - boolean
     - Set to ``true`` to indicate that the action is granted on the
       :manual:`cluster resource
       </reference/resource-document/#cluster-resource>`.

       .. note::

          This field is mutually exclusive with the
          ``actions.resources.collection`` and
          ``actions.resources.db`` fields.

   * - ``inheritedRoles``
     - array
     - Each object in the ``inheritedRoles`` array represents a
       key-value pair indicating the inherited role and the
       database on which the role is granted.

   * - ``inheritedRoles.db``
     - string
     - Database on which the inherited role is granted.

       .. note::

          This value should be ``admin`` for all roles except
          :manual:`read </reference/built-in-roles/#read>` and
          :manual:`readWrite </reference/built-in-roles/#readWrite>`.

   * - ``inheritedRoles.role``
     - string
     - Name of the inherited role. This can either be another
       custom role or a
       :manual:`built-in role </reference/built-in-roles/>`.

   * - ``roleName``
     - string
     - Name of the custom role.

       .. include:: /includes/fact-custom-role-name-restrictions.rst
