.. procedure::
   :style: normal

   .. step:: Configure the MongoDB server with OpenID Connect (OIDC)

      To configure the MongoDB server, enable the :ref:`MONGODB-OIDC <authentication-oidc>`
      authentication mechanism and use the :parameter:`oidcIdentityProviders` 
      to specify identity provider (IDP) configurations.

      .. note::

         When configuring MongoDB for |user-type| Identity Federation,
         set the ``supportsHumanFlows`` field in :parameter:`oidcIdentityProviders`
         to |humanflows-value|. 

      You can configure the MongoDB server using your configuration file or 
      command line.

      .. tabs::

         .. tab:: Configuration file
            :tabid: config file

            To use your configuration file, specify two parameters in 
            the file: 

            .. code-block:: yaml

               setParameter:
                  authenticationMechanisms: MONGODB-OIDC
                  oidcIdentityProviders: [ {
                       "issuer": "https://okta-test.okta.com", 
                       "audience": "example@kernel.mongodb.com",
                       "authNamePrefix": "okta-issuer",
                       "matchPattern": "@mongodb.com$",
                       "JWKSPollSecs": 86400
                  } ]

         .. tab:: Command line
            :tabid: command line

            To use the command line, specify the following: 

            .. code-block::

               mongod --auth --setParameter authenticationMechanisms=MONGODB-OIDC --setParameter \ 
               'oidcIdentityProviders=[ { 
                  "issuer": "https://okta-test.okta.com", 
                       "audience": "example@kernel.mongodb.com",
                       "authNamePrefix": "okta-issuer",
                       "matchPattern": "@mongodb.com$",
                       "JWKSPollSecs": 86400
                  } ]'

   .. step:: *(Optional)* Enable internal authorization

      To enable internal authorization, set the ``useAuthorizationClaim`` field 
      of the ``oidcIdentityProviders`` parameter to ``false``. This setting 
      enables more flexible user management by relying on user documents rather 
      than authorization claims from the identity provider.

      .. tabs::

         .. tab:: Configuration file
            :tabid: update internal auth

            .. code-block:: yaml
               :emphasize-lines: 8

               setParameter:
                  authenticationMechanisms: MONGODB-OIDC
                  oidcIdentityProviders: [ {
                       "issuer": "https://okta-test.okta.com", 
                       "audience": "example@kernel.mongodb.com",
                       "authNamePrefix": "okta-issuer",
                       "matchPattern": "@mongodb.com$",
                       "useAuthorizationClaim": "false",
                       "JWKSPollSecs": 86400
                  } ]
         .. tab:: Command line
            :tabid: update command line internal auth

            .. code-block::
               :emphasize-lines: 7

               mongod --auth --setParameter authenticationMechanisms=MONGODB-OIDC --setParameter \ 
               'oidcIdentityProviders=[ { 
                  "issuer": "https://okta-test.okta.com", 
                       "audience": "example@kernel.mongodb.com",
                       "authNamePrefix": "okta-issuer",
                       "matchPattern": "@mongodb.com$",
                       "useAuthorizationClaim": "false",
                       "JWKSPollSecs": 86400
                  } ]'

      When you set ``useAuthorizationClaim`` to ``false``, users who 
      authenticate with the ``MONGODB-OIDC`` mechanism obtain their 
      authorization rights from a user document in ``$external``. The server 
      searches for a user document with an ``_id`` matching the value of the 
      ``authNamePrefix/principalName`` claim for every OIDC based authentication 
      attempt for a user of your identity provider. 

      .. important::

         If this field is set to ``false``, **do not** include the ``authorizationClaim`` 
         field. 
