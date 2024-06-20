.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-access.rst

   .. step:: Add the database access |ldap| groups to |service|.
      
      Add each of the Azure database groups you created to |service|.
      Members of groups that you add are authorized to perform database actions
      granted to the group.
      
      .. include:: /includes/fact-ldap-group-1-2.rst
      .. include:: /includes/fact-ldap-group-3-azure.rst
      .. include:: /includes/fact-ldap-group-4-5.rst
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`LDAP Authorization` to :guilabel:`On`.
      
   .. step:: Verify the server details and bind credentials for your LDAP server are correct in the :guilabel:`Configure Your LDAP Server` panel.
      
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
      
      If you want to identify what group a user is a member of, you can use
      the default :guilabel:`Query Template`:
      
      .. code-block:: sh
      
         {USER}?memberOf?base
        
      .. note::
          
         Other query templates may also work.
      
   .. step:: Click :guilabel:`Verify and Save`.
      
      Wait for |service| to deploy your changes. |service| verifies that
      your clusters can connect to, authenticate with, and query your LDAP
      server using the configuration details that you provide.
      
