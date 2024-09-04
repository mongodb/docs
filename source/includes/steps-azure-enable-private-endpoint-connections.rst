.. procedure:: 
   :style: normal 

   .. step:: Enable private networking.
    
      Send a ``PATCH`` request to the :oas-atlas-op:`endpoint 
      </updateEncryptionAtRest>` and set the ``requirePrivateNetworking`` 
      flag value to ``true``.

      .. example:: 

         .. code-block:: json
            :emphasize-lines: 14

            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
            --header "Accept: application/json" \
            --header "Content-Type: application/json" \
            --include \
            --request PATCH "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AZURE/privateEndpoints" \
            --data '
              {
                "azureKeyVault": {
                  "azureEnvironment": "AZURE",
                  "clientID": "5e4ea010-a908-45a1-a70b-ebd2e4feb055",
                  "enabled": true,
                  "keyIdentifier": "https://EXAMPLEKeyVault.vault.azure.net/keys/EXAMPLEKey/d891821e3d364e9eb88fbd3d11807b86",
                  "keyVaultName": "string",
                  "requirePrivateNetworking": true,
                  "resourceGroupName": "string",
                  "secret": "string",
                  "subscriptionID": "d0dd68eb-7e97-448c-b361-f7a7213dc7e2",
                  "tenantID": "f95ac700-4c8f-4a38-a8d1-1582733edd5b"
                }
              }'

   .. step:: Create a private endpoint.

      Use the {+atlas-admin-api+} to create a private endpoint to 
      communicate with your |akv|.  
    
      Send a ``POST`` request to the :oas-atlas-op:`endpoint 
      </createEncryptionAtRestPrivateEndpoint>` with the |azure|
      region in which you want |service| to create the private
      endpoint. You must send a separate request for each region
      in which you want |service| to create a private endpoint. 

      .. example:: 

         .. code-block:: json
      
            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
            --header "Accept: application/json" \
            --header "Content-Type: application/json" \
            --include \
            --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AZURE/privateEndpoints" \
            --data '
              {
                "regionName": "US_CENTRAL"
              }'

      After you approve the private endpoint, the following restrictions
      apply: 
           
      - |service| creates all new {+clusters+} only in the regions with
        approved private endpoints.  
      - |service| deploys additional nodes for existing {+clusters+} only
        in the regions with approved private endpoints. 

   .. step:: Approve the private endpoint connections to your |akv|. 

      You can use the |azure| :azure:`UI </private-link/manage-private-endpoint>`, 
      :azure:`CLI </cli/azure/keyvault/private-endpoint-connection>`, or 
      Terraform to approve the private endpoint connections. 

      After you approve, |service| automatically migrates all
      {+clusters+} for which you enabled :ref:`customer managed keys
      <azure-enable-cluster-encryption-at-rest-pvt-endpoint>`, including
      existing {+clusters+} that allow connections using public
      internet, to use only the private endpoint connection. You can
      optionally disable public internet access to your |akv| after
      migrating your {+clusters+} to use the private endpoint
      connection. All new |service| {+clusters+} on |azure| will by
      default use only the active private endpoint connection. 

   .. step:: Check the status of your request.

      To check the status of the private endpoint, send a ``GET``
      request to the ``encryptionAtRest`` :oas-atlas-op:`endpoint </getEncryptionAtRestPrivateEndpointsForCloudProvider>`. 
      
      .. example:: 

         .. io-code-block:: 
            :copyable: true
            
            .. input:: 
               :language: shell

               curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
               --header "Accept: application/json" \
               --header "Content-Type: application/json" \
               --include \
               --request GET "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AZURE/privateEndpoints"               
      
            .. output:: 
               :language: shell

               {
                 "links": [
                   {
                     "href": "https://cloud.mongodb.com/api/atlas",
                     "rel": "self"
                   }
                 ],
                 "results": [
                   {
                     "cloudProvider": "AZURE",
                     "errorMessage": "string",
                     "id": "24-hexadecimal-digit-string",
                     "regionName": "string",
                     "status": "INITIATING",
                     "privateEndpointConnectionName": "string"
                   }
                 ],
                 "totalCount": 0
               }

      After you approve the private endpoint, it can take |service| up
      to three minutes to reflect the current status of your private
      endpoint. The private endpoint can have one of the following
      statuses:   

      .. include:: /includes/list-tables/azure-pvt-endpoint-statuses.rst
