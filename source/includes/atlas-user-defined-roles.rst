.. _add-custom-role-atlas:

Add a Custom User-Defined Role in {+atlas+}
-----------------------------------------------

You can create custom user-defined roles in {+atlas+} when the 
:ref:`built-in roles <atlas-user-privileges>` don't include your
desired set of privileges. To learn more see, 
:atlas:`Add Custom Roles 
</security-add-mongodb-roles/#add-custom-roles>` in the {+atlas+} 
documentation.

.. See https://www.mongodb.com/docs/atlas/security-add-mongodb-roles/#add-custom-roles for source material.

.. tabs::

   .. tab:: {+atlas-cli+}
      :tabid: atlascli

      To create a custom database role for your project using the 
      {+atlas-cli+}, run the following command:

      .. code-block:: sh
         
         atlas customDbRoles create <roleName> [options]
      
      To learn more about the command syntax and parameters, see 
      the {+atlas-cli+} documentation for 
      :atlascli:`atlas customDbRoles create 
      </command/atlas-customDbRoles-create/>`.

   .. tab:: {+atlas-admin-api+}
      :tabid: api

      To create custom roles through the {+atlas-admin-api+}, 
      see :oas-atlas-op:`Create One Custom Role 
      </createCustomDatabaseRole>`.

   .. tab:: {+atlas-ui+}
      :tabid: ui

      Follow these steps to create a custom role through the 
      {+atlas-ui+}: 

      .. procedure::
         :style: normal

         .. step:: Open the :guilabel:`Add Custom Role` dialog

            a. In the :guilabel:`Security` section of the left 
               navigation, click :guilabel:`Database Access`. 
      
            #. Click the :guilabel:`Custom Roles` tab.

            #. Click :icon-fa5:`plus` 
               :guilabel:`Add New Custom Role`.
         
         .. step:: Enter the information for the custom role

            .. list-table::
               :widths: 20 80
               :header-rows: 1

               * - Field

                 - Description

               * - :guilabel:`Custom Role Name`

                 - Name of your custom role.

               * - :guilabel:`Action or Role`

                 - Privileges granted by the role. Click the 
                   drop-down menu to view the list of available 
                   :manual:`privilege actions 
                   </reference/privilege-actions/>` and 
                   :manual:`roles </reference/built-in-roles/>`.

                   {+atlas+} groups the actions and roles into 
                   the following categories:

                   - ``Collection Actions``
                   - ``Database Actions and Roles``
                   - ``Global Actions and Roles``
                   - ``Custom Roles`` (if any)

                   Select the action or role from a single 
                   category. Once you select an action or role, 
                   {+atlas+} disables the other categories with 
                   the following exception. If you select an 
                   action or role from the 
                   :guilabel:`Global Actions and Roles`, you can 
                   still select actions/roles from 
                   :guilabel:`Custom Roles`.

                   To grant actions and roles from a different 
                   category, click :guilabel:`Add an action or role` to 
                   add a new row.

               * - :guilabel:`Database`

                 - Database on which the selected actions and 
                   roles are granted, if applicable.

                   {+atlas+} requires this field for all roles 
                   and actions under the 
                   :guilabel:`Collection Actions` and
                   :guilabel:`Database Actions and Roles` 
                   categories.

               * - :guilabel:`Collection`

                 - Collection within the specified database on 
                   which the actions and roles are granted, if 
                   applicable.

                   {+atlas+} requires this field for all roles 
                   and actions under 
                   :guilabel:`Collection Actions`.

                   To grant the same set of privileges on 
                   multiple databases and collections, click 
                   :guilabel:`Add a database or collection`.

         .. step:: Click :guilabel:`Add Custom Role`
