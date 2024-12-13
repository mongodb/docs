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
                  "clientID": "b054a9ff-b60a-4cb6-8df6-20726eaefce6",
                  "enabled": true,
                  "keyIdentifier": "https://test-tf-export.vault.azure.net/keys/test/78b9134f9bc94fda8027a32b4715bf3f",
                  "keyVaultName": "test-tf-export",
                  "resourceGroupName": "test-tf-export",
                  "secret": "",
                  "subscriptionID": "009774e0-124f-4a69-83e0-ca8cd8acb4e2",
                  "tenantID": "1f6ef922-9303-402a-bae2-cc68810b023c"
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
                   "clientID": "632ff709-32a8-48a3-8224-30d2386fadaf",
                   "enabled": true,
                   "keyIdentifier": "https://EXAMPLEKeyVault.vault.azure.net/keys/EXAMPLEKey/d891821e3d364e9eb88fbd3d11807b86",
                   "keyVaultName": "string",
                   "requirePrivateNetworking": false,
                   "resourceGroupName": "string",
                   "subscriptionID": "a39012fb-d604-4cd1-8841-77f705f3e6d5",
                   "tenantID": "ee46317d-36a3-4472-a3dd-6549e901da0b",
                   "valid": true
                 }
               }

      In the response, ``enabled`` is ``true`` if your project is
      successfully enabled for Encryption at Rest using |cmk|. You can
      set up private networking to ensure that all traffic between
      |service| and Key Vault takes place over |azure|'s private network
      interfaces. To learn more, see :ref:`azure-kms-enable-pvt-endpoint`. 
