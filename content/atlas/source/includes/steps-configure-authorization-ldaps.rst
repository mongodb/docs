.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`LDAP Authorization` to :guilabel:`On`.
      
   .. step:: Enter the server details and bind credentials for your LDAP server in the :guilabel:`Configure Your LDAP Server` panel.
      
   .. step:: Enter a query template in :guilabel:`Query Template`.
      
      When a user attempts to perform an action, |service| executes the 
      :manual:`LDAP query template 
      </reference/configuration-options/#security.ldap.authz.queryTemplate>`
      to obtain the LDAP groups to which the authenticated user belongs.
      |service| permits the action if the query returns at least one group 
      that is authorized to perform the action. |Service| does not permit 
      the action if the query returns no groups that are authorized to 
      perform the action.
      
      |service| substitutes the authenticated username in the ``{USER}`` 
      placeholder when it runs the query. The query is relative to the host 
      specified in :guilabel:`Server Hostname`. 
      
      The formatting for the query must conform to `RFC4515 <https://www.rfc-editor.org/rfc/rfc4515>`__.
      
      If you do not provide a query template, |service| applies the default
      value: ``{USER}?memberOf?base``.
      
   .. step:: Click :guilabel:`Verify and Save`.
      
      Wait for |service| to deploy your changes. |service| verifies that
      your clusters can connect to, authenticate with, and query your LDAP
      server using the configuration details that you provide.
