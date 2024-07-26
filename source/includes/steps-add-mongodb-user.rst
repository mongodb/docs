.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Click the :guilabel:`MongoDB Users` tab.
      
   .. step:: Click the :guilabel:`Add New User` button.
      
   .. step:: Complete the user account fields.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Field
      
           - Description
      
         * - :guilabel:`Identifier`
      
           - 
             - In the first field, enter the database on which the user
               authenticates.
      
             - In the second field, enter a username on that database.
      
             Together, the database and username uniquely identify the
             user. Though the user has just one authentication database,
             the user can have privileges on other databases. You grant
             those privileges when assigning the user roles.
      
             If you are authenticating with an external system, like
             Kerberos or an LDAP server, add users to the
             ``$external`` database.
      
         * - :guilabel:`Roles`
      
           - Enter any available user-defined roles and :manual:`built-in
             roles </reference/built-in-roles>` into this box. The combo 
             box provides a list of existing roles when you click in it.
      
         * - :guilabel:`Password`
      
           - Enter the user's password.
      
             .. important::
      
                If you specified ``$external`` as the database in the
                :guilabel:`Identifier`, you do not need to specify a
                password for the new user.
      
         * - :guilabel:`Authentication Restrictions`
      
           - 
             a. Click :guilabel:`Add Entry`.
      
             b. Add one or more |ipaddr| addresses and/or |cidr| blocks in 
                either the :guilabel:`Client Source` or :guilabel:`Server 
                Address` boxes. Separate multiple addresses or blocks with 
                commas.
      
                - :guilabel:`Client Source` restricts which addresses this 
                  user can authenticate and use the given roles.
      
                - :guilabel:`Server Address` restricts the addresses this 
                  user can authenticate and has the given roles.
      
             c. Click :guilabel:`Save`.
      
             d. To add another entry, click :guilabel:`Add Entry`.
      
   .. step:: Click :guilabel:`Add User`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
