.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Click the :guilabel:`MongoDB Users` tab.
      
   .. step:: Click :guilabel:`Edit` next to the user you want to modify.
      
   .. step:: Edit the user's information.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Field
      
           - Description
      
         * - :guilabel:`Identifier`
      
           - These values cannot be edited.
      
         * - :guilabel:`Roles`
      
           - Enter any available user-defined roles and :manual:`built-in
             roles </reference/built-in-roles>` into this box. The combo 
             box provides a list of existing roles when you click in it.
      
             To remove a role, click the ``x`` to the left of that role.
      
         * - :guilabel:`Password`
      
           - Enter the user's password.
      
             :gold:`IMPORTANT:` If you specified ``$external`` as the
             database in the :guilabel:`Identifier`, you do not need to
             change this value.
      
         * - :guilabel:`Authentication Restrictions`
      
           - To add an authentication restriction:
      
             a. Click :guilabel:`Add Entry`.
      
             b. Add one or more |ipaddr| addresses or |cidr| blocks in 
                either the :guilabel:`Client Source` or :guilabel:`Server 
                Address` boxes. Separate multiple addresses or blocks with 
                commas.
      
                - :guilabel:`Client Source` restricts which addresses this 
                  user can authenticate and use the given roles.
      
                - :guilabel:`Server Address` restricts the addresses this 
                  user can authenticate and has the given roles.
      
             c. Click :guilabel:`Save`.
      
             d. To add another entry, click :guilabel:`Add Entry`.
      
             To remove an authentication restriction:
      
             a. Click the ``x`` to the right of the authentication 
                restriction.
      
   .. step:: Click :guilabel:`Save Changes`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
