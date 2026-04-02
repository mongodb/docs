To make an |api| request using a service account, use the service account to generate
an access token, then use the access token in your request:

.. procedure::  
   :style: normal 

   .. step:: Retrieve the client secret for your service account.

      Locate the client secret beginning with ``mdb_sa_sk_`` that you saved 
      immediately after :ref:`creating the service account <see-org-api-keys>`, 
      which was the only time you could view the client secret.
      If you did not save the client secret, you must generate a new client secret.

   .. step:: Base64-encode the client ID and secret.

      For example, run:

      .. code:: sh

         echo -n {clientId}:{clientSecret} | base64

   .. step:: Request an access token.

      Make a ``POST`` request to the
      :ref:`cloud.mongodb.com/api/oauth/token
      <generate-oauth2-token-atlas>` endpoint to generate an access
      token for your service account.
      
      Replace ``{base64Auth}`` in the following example with the output
      from the preceding step, then run:

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: sh
            :linenos: 

            curl --request POST \                                                                             
               --url https://cloud.mongodb.com/api/oauth/token \
               --header 'accept: application/json' \
               --header 'cache-control: no-cache' \
               --header 'authorization: Basic {base64Auth}' \                                 
               --header 'content-type: application/x-www-form-urlencoded' \
               --data 'grant_type=client_credentials'

         .. output::
            :language: sh

            {"access_token":"{accessToken}","expires_in":3600,"token_type":"Bearer"}%

      .. important:: 

         The access token is valid for 1 hour (3600 seconds). You can't refresh an access token.
         When this access token expires, repeat this step to generate a new one.   

   .. step:: Make an |api| call.

      Replace ``{accessToken}`` in the following example with the output from the 
      preceding step. 

      The following sample ``GET`` request 
      :oas-bump-atlas-op:`returns all projects </listgroups>` in your organization:

      .. code-block:: sh

            curl --request GET \
                 --url https://cloud.mongodb.com/api/atlas/v2/groups \
                 --header 'Authorization: Bearer {accessToken}' \
                 --header 'Accept: application/vnd.atlas.2023-02-01+json' \
                 --header 'Content-Type: application/json'

      The following sample ``POST`` request takes a request body and
      :oas-bump-atlas-op:`creates a project </creategroup>` named 
      ``MyProject`` in your organization:

      .. code-block:: sh

         curl --header 'Authorization: Bearer {accessToken}' \
               --header "Content-Type: application/json" \
               --header "Accept: application/vnd.atlas.2023-02-01+json" \
               --include \
               --request POST "https://cloud.mongodb.com/api/atlas/v2/groups" \
               --data '
                  {
                     "name": "MyProject",
                     "orgId": "5a0a1e7e0f2912c554080adc"
                  }'
