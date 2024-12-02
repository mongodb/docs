.. procedure:: 
   :style: normal

   .. step:: Send a ``PATCH`` request to the ``encryptionAtRest`` :oas-atlas-op:`endpoint </updateEncryptionAtRest>`. 

      .. example:: 

         .. code-block:: json
      
            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
            --header "Accept: application/vnd.atlas.2024-05-30+json" \
            --header "Content-Type: application/vnd.atlas.2024-05-30+json" \
            --request PATCH "https://cloud.mongodb.com/api/atlas/v2/groups/66c9e8f1dd6c9960802420e9/encryptionAtRest" \
            --data '
            {
               "azureKeyVault": {
                  "azureEnvironment": "AZURE",
                  "clientID": "f8b64e7a-4a65-413d-a9fa-7230f003a749",
                  "enabled": true,
                  "keyIdentifier": "https://test-tf-export.vault.azure.net/keys/test/78b9134f9bc94fda8027a32b4715bf3f",
                  "keyVaultName": "test-tf-export",
                  "resourceGroupName": "test-tf-export",
                  "secret": "",
                  "subscriptionID": "fd01adff-b37e-4693-8497-83ecf183a145",
                  "tenantID": "91405384-d71e-47f5-92dd-759e272cdc1c"
               }
            }' 

      .. note:: 

         You can't modify the following settings after you :ref:`enable
         and set up private endpoint connections 
         <azure-kms-enable-pvt-endpoint>` to your |akv|:

         - ``keyVaultName``
         - ``resourceGroupName``
         - ``subscriptionID``

   .. step:: Verify the configuration for Encryption at Rest using |cmk| for your project.

      To verify your request to enable and configure encryption at rest
      using the keys you manage using |akv|, send a ``GET`` request to
      the ``encryptionAtRest`` :oas-atlas-op:`endpoint </getEncryptionAtRest>`.  
      
      .. example:: 

         .. io-code-block:: 
            :copyable: true
            
            .. input:: 
               :language: json
      
               curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
               --header "Accept: application/vnd.atlas.2024-05-30+json" \
               --header "Content-Type: application/vnd.atlas.2024-05-30+json" \
               --include \
               --request GET "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest"      
      
            .. output:: 
               :language: shell

               {
                 "azureKeyVault": {
                   "azureEnvironment": "AZURE",
                   "clientID": "5e4ea010-a908-45a1-a70b-ebd2e4feb055",
                   "enabled": true,
                   "keyIdentifier": "https://EXAMPLEKeyVault.vault.azure.net/keys/EXAMPLEKey/d891821e3d364e9eb88fbd3d11807b86",
                   "keyVaultName": "string",
                   "requirePrivateNetworking": false,
                   "resourceGroupName": "string",
                   "subscriptionID": "d0dd68eb-7e97-448c-b361-f7a7213dc7e2",
                   "tenantID": "f95ac700-4c8f-4a38-a8d1-1582733edd5b",
                   "valid": true
                 }
               }

      In the response, ``enabled`` is ``true`` if your project is
      successfully enabled for Encryption at Rest using |cmk|. You can
      set up private networking to ensure that all traffic between
      |service| and Key Vault takes place over |azure|'s private network
      interfaces. To learn more, see :ref:`azure-kms-enable-pvt-endpoint`. 
