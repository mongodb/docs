To generate an access token for a service account:

.. procedure::  
   :style: normal 

   .. step:: Retrieve the client secret for your service account.

      Locate the client secret beginning with ``mdb_sa_sk_`` that you
      saved immediately after :ref:`creating the service account
      <see-org-api-keys>`, which was the only time you could view the
      client secret. If you did not save the client secret, you must
      generate a new client secret.

   .. step:: Base64-encode the client ID and secret.

      For example, run:

      .. code:: sh

         echo -n {clientId}:{clientSecret} | base64

   .. step:: Request an access token.

      Replace ``{base64Auth}`` in the following example with the output from the 
      preceding step, then run:

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