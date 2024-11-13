.. tabs::

   .. tab:: Authorize Users with IdP Groups
      :tabid: add-idp-groups

      .. procedure::
         :style: normal
      
         .. step:: Create MongoDB roles
      
            In the ``admin`` database, use the :method:`db.createRole()` method to create 
            roles that map the identity provider group roles to MongoDB roles.
      
            Use the following format to create roles: 
      
            .. code-block::
      
               <authNamePrefix>/<authorizationClaim>
      
            The :parameter:`oidcIdentityProviders` parameter provides the ``authNamePrefix`` 
            field and the ``authorizationClaim`` field. For example: 
      
            .. code-block:: javascript
               
               db.createRole( { 
                  role: "okta/Everyone", 
                  privileges: [ ], 
                  roles: [ "readWriteAnyDatabase" ] 
               } )
   
   .. tab:: Authorize Users with User IDs
      :tabid: add-user-id

      .. procedure::
         :style: normal  

         .. step:: Switch to the $external database
      
            When you create a user, you must create it in the ``$external`` database. 
            To switch to the ``$external`` database, run the following command:
      
            .. code-block::
      
               use $external
      
         .. step:: Create a user
      
            To create users and add them to your MongoDB database, use the 
            :method:`db.createUser()` command.
      
            Use the following format for the ``user`` field, where the ``authNamePrefix`` 
            and ``authorizationClaim`` values come from the :parameter:`oidcIdentityProviders` 
            parameter:
      
            .. code-block::
      
               <authNamePrefix>/<authorizationClaim>
         
            To create a user in MongoDB with the ``authNamePrefix`` of ``okta`` and 
            an ``authorizationClaim`` of ``jane.doe``, run the following:
      
            .. code-block:: javascript
      
               db.createUser( {
                  user: "okta/jane.doe", 
                  roles: [
                     {
                        role: "readWriteAnyDatabase", 
                        db: "admin"
                     }
                  ]
               } )
      