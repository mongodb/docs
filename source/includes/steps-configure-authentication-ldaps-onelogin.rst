.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`LDAP Authentication` to :guilabel:`On`.
      
      .. note::
      
         You might incur additional costs when you enable this feature.
         See :ref:`advanced-security`.
      
   .. step:: Enter the server details and bind credentials for all of your LDAP servers in the :guilabel:`Configure Your LDAP Server` panel.

      You may list multiple servers separated by commas. You cannot use different ports.
      
   .. step:: Add a User to DN Mapping.
      
      Add a User to DN mapping similar to the following example to allow 
      clients to provide their email addresses instead of full DNs when they
      connect to |service| databases:
      
      .. code-block:: sh
      
         [
            {
                "match": "(.+)",
                "substitution": "cn={0},ou=users,dc=<onelogin_instance_id>,dc=onelogin,dc=com"
            }
         ]
      
   .. step:: Enter certificates issued from a Certificate Authority (CA) for your LDAP servers, separated by commas, in the :guilabel:`CA Root Certificate` field.
      
      You may provide self-signed certificates.
      
   .. step:: Click :guilabel:`Verify and Save`.
      
      Wait for |service| to deploy your changes. |service| verifies that
      your clusters can connect to, authenticate with, and query your LDAP
      servers using the configuration details that you provided.

   .. include:: /includes/nav/steps-db-access.rst
      
   .. step:: Add |ldap| users to |service|
      
      .. note::
      
         :ref:`Skip this step <configure-onelogin-authz>` if you want to 
         enable LDAP authorization.
      
      Add users managed in the OneLogin |ldap| to |service|.
      
      a. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      #. Click :guilabel:`LDAP User`.
      #. Perform one of the following:
      
         i. If you have not entered a :guilabel:`User to DN Mapping`, enter 
            the full DN of the |ldap| user. Follow this template:
      
            .. code-block:: sh
            
               cn=<user-name>,ou=users,dc=<onelogin-instance-id>,dc=onelogin,dc=com
      
            For example, if your ``<user-name>`` is ``jane@example.com`` and 
            your ``<onelogin-instance-id>`` is ``mdb-example``, your bind user's 
            DN is:
      
            .. code-block:: sh
               :copyable: false
            
               cn=jane@example.com,ou=users,dc=mdb-example,dc=onelogin,dc=com
              
         #. If you entered a :guilabel:`User to DN Mapping`,
            enter the username or email address that your mapping requires.
            
      #. Select the database access level to grant to the user.
      #. Click :guilabel:`Add User`.
      