.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Click the :guilabel:`MongoDB Roles` tab.
      
   .. step:: Click :guilabel:`Add New Role`.
      
   .. step:: In the :guilabel:`Identifier` field, enter the database on which to define the role and enter a name for the role.
      
      A role applies to the database on which it is defined and can grant
      access down to the collection level. The combination of the role name
      and its database uniquely identify that role. Complete the
      :guilabel:`Identifier` fields to meet the authentication and
      authorization methods you use:
      
      * If you use neither LDAP authentication nor authorization, type the
        database name in the :guilabel:`database`
        :guilabel:`Identifier` field and the name you want for the role in the
        :guilabel:`name` :guilabel:`Identifier` field.
      
      * If you use LDAP authentication, but not LDAP authorization, type
        ``$external`` in the :guilabel:`database` :guilabel:`Identifier` field and
        the name you want for the role in the :guilabel:`name`
        :guilabel:`Identifier` field.
      
      * If you use any authentication method with LDAP Authorization, type
        ``admin`` in the :guilabel:`database` :guilabel:`Identifier` field and the
        LDAP Group DN in the :guilabel:`name` :guilabel:`Identifier` field.
      
        .. example::
        
           In your LDAP server, you created an LDAP Group with a Distinguished
           Name of ``CN=DBA,CN=Users,DC=example,DC=com``. If you want to create a
           DBA role in |mms| linked to this LDAP Group, type ``admin`` in the
           :guilabel:`database` :guilabel:`Identifier` field and
           ``CN=DBA,CN=Users,DC=example,DC=com`` in the :guilabel:`name`
           :guilabel:`Identifier` field.
      
   .. step:: Select the privileges to grant the new role.
      
   .. step:: Click :guilabel:`Add Privileges`.
      
   .. step:: Click :guilabel:`Add Role`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
