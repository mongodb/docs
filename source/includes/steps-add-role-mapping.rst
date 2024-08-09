.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-settings.rst
      
   .. step:: Open the :guilabel:`Federation Management Console`.
      
      In :guilabel:`Manage Federation Settings`, click
      :guilabel:`Visit Federation Management App`.
      
   .. step:: Choose an organization in which you want to map roles.
      
      a. Click :guilabel:`Manage Organizations`.
      
         |mms| displays all organizations where you are an
         :authrole:`Organization Owner` in a table.
      
         - Organizations connected to federated authentication display
           :icon-mms:`ellipsis` in the :guilabel:`Actions` column.
      
         - Organizations unconnected to federated authentication display
           :guilabel:`Connect` in the :guilabel:`Actions` column.
      
      #. To map roles in an organization:
      
         i. Click :guilabel:`Connect` to enable federated authentication
            for that organization if needed.
         #. Click :icon-mms:`ellipsis` and select :guilabel:`View`.
      
   .. step:: Navigate to the :guilabel:`Create Role Mapping For Your Users` page.

      a. Click :guilabel:`Create Role Mappings`.
      
         |mms| displays the :guilabel:`Organization Role Mappings`
         page.
      
      b. Click :guilabel:`Create A Role Mapping`.
      
         |mms| displays the :guilabel:`Create Role Mapping For Your
         Users` page.
      
   .. step:: Assign |mms| organization roles to the desired IdP group.
      At the :guilabel:`Map Group and Assign Roles` stage:
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Section
           - Action
         * - Enter Group Name
           - Type the name of the group as it is displayed in your |idp| in
             this field. |mms| assigns this group to your |mms|
             role.
      
             .. note::
      
                If the |idp| group doesn't exist, you can't enter a new
                group name to create a new |idp| group.
      
                If you use |azure| as your |idp| and you selected
                :guilabel:`Group Id` as your source attribute, enter the
                group's Object ID in this field instead of the group's name.
                To learn more, see :ref:cm-configure-azuread-idp`.
      
         * - Assign Organization Roles
           - Click on each |mms| organization role that you want to
             assign to the |idp| group.
      
      - If you don't need to assign any |mms| project roles to this
        |idp| group, click :guilabel:`Finish`. You can skip the rest of
        this procedure.
      
      - If you need to assign |mms| project roles to this |idp| group,
        click :guilabel:`Next`.
      
   .. step:: Assign project roles to the desired IdP group.
      
      The :guilabel:`Assign Project Roles` stage displays a table. This
      table includes project names and the roles you can assign for those
      projects. For each project, click the project roles that you want
      to assign to the |idp| group.
      
      - If you don't need to review the roles assigned to this
        |idp| group, click :guilabel:`Finish`. You can skip the rest of
        this procedure.
      
      - If you need to review the roles assigned to this |idp| group,
        click :guilabel:`Next`.
      
   .. step:: Verify which roles have been assigned to the desired IdP group.
      
      The :guilabel:`Review and Confirm` stage displays the organization
      and project roles assigned to the |idp| group.
      
      - If you agree with the roles assigned to this
        |idp| group, click :guilabel:`Finish`.
      
      - If you need to change the roles assigned to this |idp| group, click
        :icon-fa5:`pencil-alt`. |mms| returns to the :guilabel:`Map
        Group and Assign Roles` stage, described in step 4.
