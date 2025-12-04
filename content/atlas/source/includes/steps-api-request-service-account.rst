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

         echo -n {CLIENT-ID}:{CLIENT-SECRET} | base64

   .. step:: Request an access token.

      Replace ``{BASE64-AUTH}`` in the following example with the output from the 
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
               --header 'authorization: Basic {BASE64-AUTH}' \                                 
               --header 'content-type: application/x-www-form-urlencoded' \
               --data 'grant_type=client_credentials'

         .. output::
            :language: sh

            {"access_token":"eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6ImYyZjE2YmE4LTkwYjUtNDRlZS1iMWYwLTRkNWE2OTllYzVhNyJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLWRldi5tb25nb2RiLmNvbSIsImF1ZCI6ImFwaTovL2FkbWluIiwic3ViIjoibWRiX3NhX2lkXzY2MjgxYmM2MDNhNzFhNDMwYjkwNmVmNyIsImNpZCI6Im1kYl9zYV9pZF82NjI4MWJjNjAzYTcxYTQzMGI5MDZlZjciLCJhY3RvcklkIjoibWRiX3NhX2lkXzY2MjgxYmM2MDNhNzFhNDMwYjkwNmVmNyIsImlhdCI6MTcxMzkwNTM1OSwiZXhwIjoxNzEzOTA4OTU5LCJqdGkiOiI4ZTg1MTM3YS0wZGU1LTQ0N2YtYTA0OS1hMmVmNTIwZGJhNTIifQ.AZSFvhcjwVcJYmvW6E_K5UnDmeiX2sJgL27vo5ElzeBuPawRciKkn6ervZ6IpUTx2HHllGgAAMmhaP9B66NywhfjAXC697X9KcOzm81DTtvDjLrFeRSc_3vFmeGvfUKKXljEdWBnbmwCwtBlO5SJuBxb1V5swAl-Sbq9Ymo4NbyepSnF","expires_in":3600,"token_type":"Bearer"}%

      .. important:: 

         The access token is valid for 1 hour (3600 seconds). You can't refresh an access token.
         When this access token expires, repeat this step to generate a new one.   

   .. step:: Make an |api| call.

      Replace ``{ACCESS-TOKEN}`` in the following example with the output from the 
      preceding step. 

      The following sample ``GET`` request 
      :oas-bump-atlas-op:`returns all projects </listgroups>` in your organization:

      .. code-block:: sh

            curl --request GET \
                 --url https://cloud.mongodb.com/api/atlas/v2/groups \
                 --header 'Authorization: Bearer {ACCESS-TOKEN}' \
                 --header 'Accept: application/vnd.atlas.2023-02-01+json' \
                 --header 'Content-Type: application/json'

      The following sample ``POST`` request takes a request body and
      :oas-bump-atlas-op:`creates a project </creategroup>` named 
      ``MyProject`` in your organization:

      .. code-block:: sh

         curl --header 'Authorization: Bearer {ACCESS-TOKEN}' \
               --header "Content-Type: application/json" \
               --header "Accept: application/vnd.atlas.2023-02-01+json" \
               --include \
               --request POST "https://cloud.mongodb.com/api/atlas/v2/groups" \
               --data '
                  {
                     "name": "MyProject",
                     "orgId": "5a0a1e7e0f2912c554080adc"
                  }'
