.. code-block:: 
   :copyable: true 

   atlas dbusers create  \
     --projectId 6698000acf48197e089e4085 \
     --username "tempUser" \
     --password "securePassword" \
     --role "readWrite" \
     --scope "myCluster" \
     --deleteAfter "2025-02-01T12:00:00Z"