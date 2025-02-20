.. procedure:: 
   :style: normal 

   .. step:: Create a private endpoint.

      Use the {+atlas-admin-api+} to create a private endpoint to 
      communicate with your |aws| |kms|.  
    
      Send a ``POST`` request to the ``encryptionAtRest`` :oas-atlas-op:`endpoint 
      </createEncryptionAtRestPrivateEndpoint>` with the |aws|
      region in which you want |service| to create the private
      endpoint. You must send a separate request for each region
      in which you want |service| to create a private endpoint. 

      .. example:: 

         .. code-block:: shell
      
            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
            --header "Accept: application/vnd.atlas.2024-11-13+json" \
            --header "Content-Type: application/vnd.atlas.2024-11-13+json" \
            --include \
            --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AWS/privateEndpoints" \
            --data '
              {
                "regionName": "US_EAST_1"
              }'

      After you create the private endpoint, the following restrictions
      apply: 
           
      - |service| creates all new {+clusters+} only in the regions with
        approved private endpoints.  
      - |service| deploys additional nodes for existing {+clusters+} only
        in the regions with approved private endpoints. 

   .. step:: Check the status of your request.

      To check the status of the private endpoint, send a ``GET``
      request to the ``encryptionAtRest`` :oas-atlas-op:`endpoint </getEncryptionAtRestPrivateEndpointsForCloudProvider>`. 
      
      .. example:: 

         .. io-code-block:: 
            :copyable: true
            
            .. input:: 
               :language: shell

               curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
               --header "Accept: application/vnd.atlas.2024-11-13+json" \
               --header "Content-Type: application/vnd.atlas.2024-11-13+json" \
               --include \
               --request GET "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/encryptionAtRest/AWS/privateEndpoints"               
      
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
                     "cloudProvider": "AWS",
                     "id": "24-hexadecimal-digit-string",
                     "privateEndpointConnectionName": "string",
                     "regionName": "US_EAST_1",
                     "status": "INITIATING",
                   }
                 ],
                 "totalCount": 1
               }

      |service| can take up
      to three minutes to reflect the current status of your private
      endpoint. The private endpoint can have one of the following
      statuses:   

      .. include:: /includes/list-tables/aws-pvt-endpoint-statuses.rst
