.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-access.rst

   .. step:: Open the :guilabel:`Add Custom Role` dialog box.
    
      a. Click the :guilabel:`Custom Roles` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Custom Role`.
      
   .. step:: Enter role information.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Field
      
           - Description
      
         * - :guilabel:`Custom Role Name`
      
           - Name of your custom role.
      
             .. include:: /includes/fact-custom-role-name-restrictions.rst
      
         * - :guilabel:`Action or Role`
      
           - Privileges granted by the role. Click the dropdown to view the
             list of available
             :manual:`privilege actions </reference/privilege-actions/>`
             and :manual:`roles </reference/built-in-roles/>`.
      
             |service| groups the actions and roles into the following
             categories:
      
             - ``Collection Actions``,
             - ``Database Actions and Roles``,
             - ``Global Actions and Roles``,
             - ``Custom Roles`` (if any)
      
             Select the action or role from a single category. Once you
             select an action or role, |service| disables the other categories
             with the following exception. If you select an action/role
             from the :guilabel:`Global Actions and Roles`, you can still
             select actions/roles from :guilabel:`Custom Roles`.
      
             To grant actions and roles from a different category, click
             :guilabel:`Add an action or role` to add a new row.
      
             .. include:: /includes/fact-custom-roles-compatibility.rst
      
         * - :guilabel:`Database`
      
           - Database on which the selected actions and roles
             are granted, if applicable.

             To specify the database, type the database name or select
             :guilabel:`Apply to any database`.

             :red:`WARNING:` If you select :guilabel:`Apply to any database`, 
             the roles grants permissions for actions on the ``admin``,
             ``local``, ``config``, and ``__mdb_internal_`` databases. We **don't**
             recommend writes to these databases. To learn more, see :ref:`cloud-system-databases`
             and :ref:`metadata-system-collections`.
      
             This field is required for all roles and actions under the
             :guilabel:`Collection Actions` and
             :guilabel:`Database Actions and Roles` categories.
      
         * - :guilabel:`Collection`
      
           - Collection within the specified database on which
             the actions and roles are granted, if applicable.

             To specify the collection, type the collection name or
             select :guilabel:`Apply to any collection`.

             :red:`WARNING:` If you select :guilabel:`Apply to any collection`,
             the roles grants permissions for actions on the collections
             in the ``admin``, ``local``, and ``config`` databases.
             We **don't** recommend writes to these collections.
      
             This field is required for all roles and actions under
             :guilabel:`Collection Actions`.
      
      To grant the same set of privileges on multiple databases and
      collections, click :guilabel:`Add a database or collection`.
      
   .. step:: Click :guilabel:`Add Custom Role`.
