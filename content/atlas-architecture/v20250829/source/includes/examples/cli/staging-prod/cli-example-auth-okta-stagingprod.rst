.. code-block:: 
   :copyable: true

   atlas dbusers create \
     --projectId "6698000acf48197e089e4085" \
     --username "okta/my-idp-group" \
     --role "readWrite,dbAdmin" \
     --oidcType "IDP_GROUP" 
