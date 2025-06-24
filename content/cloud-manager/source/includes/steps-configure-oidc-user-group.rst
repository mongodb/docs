.. procedure:: 
   :style: normal
   
   .. step:: Navigate to the :guilabel:`MongoDB Roles` tab for your deployment.
        
      a. Select the organization that
         contains your project from the |ui-org-menu| in the
         navigation bar.

      #. Select your project
         from the :guilabel:`Projects` menu in the navigation bar.

      #. Click :guilabel:`Deployment` in 
         the sidebar.
      
      #. Click the :guilabel:`Security` tab.
      #. Click the :guilabel:`MongoDB Roles` tab.

   .. step:: Click :guilabel:`Add New Role`.

   .. step:: Create the OIDC role.

      a. Enter the following fields:

         .. list-table::
            :header-rows: 1
            :widths: 20 20 60

            * - Field
              - Necessity
              - Description

            * - :guilabel:`Identifier`
              - Required
              - In the :guilabel:`Database` box, enter ``admin``.
                
                In the :guilabel:`Name` box, enter your |oidc| |idp| configuration
                name and the group name from your external identity provider,
                separated by a slash ``/``:

                .. code-block:: none

                   {configuration_name}/{group_name}

            * - :guilabel:`Inherits From`
              - Optional
              - A list of role name and database pairs. The format for these
                pairs are ``roleName@dbName``.

            * - :guilabel:`Authentication Restrictions`
              - Optional
              - A list of IP addresses or CIDR notations that you want to
                restrict from your |idp|.

            * - :guilabel:`Privilege Actions by Resource`
              - Optional
              - Actions permitted on the resource.

                To learn more, see :manual:`Privilege Actions </reference/privilege-actions/>`.

      #. Click :guilabel:`Add Role`. 

