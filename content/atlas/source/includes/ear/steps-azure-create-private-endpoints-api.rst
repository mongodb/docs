.. procedure:: 
   :style: normal 

   .. step:: Create a private endpoint.
    
      Send a ``POST`` request to the :oas-atlas-op:`endpoint 
      </createEncryptionAtRestPrivateEndpoint>` with the |azure|
      region in which you want |service| to create the private
      endpoint. You must send a separate request for each region
      in which you want |service| to create a private endpoint. 

      .. example:: 

         .. code-block:: json
      
            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
            --header "Accept: application/vnd.atlas.2023-01-01+json" \
            --header "Content-Type: application/vnd.atlas.2023-01-01+json" \
            --include \
            --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AZURE/privateEndpoints" \
            --data '
              {
                "regionName": "US_CENTRAL"
              }'

   .. step:: Approve the private endpoint connections to your |akv|. 

      You can use the |azure| :azure:`UI </private-link/manage-private-endpoint>`, 
      `CLI <https://learn.microsoft.com/en-us/cli/azure/network/private-endpoint-connection>`__, or 
      Terraform to approve the private endpoint connections. 

   .. step:: Check the status of your request.

      To check the status of the private endpoint, send a ``GET``
      request to the ``encryptionAtRest`` :oas-atlas-op:`endpoint </getEncryptionAtRestPrivateEndpointsForCloudProvider>`. 
      
      .. example:: 

         .. io-code-block:: 
            :copyable: true
            
            .. input:: 
               :language: json

               curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
               --header "Accept: application/vnd.atlas.2023-01-01+json" \
               --header "Content-Type: application/vnd.atlas.2023-01-01+json" \
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

      .. include:: /includes/list-tables/azure-pvt-endpoint-statuses-api.rst