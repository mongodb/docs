.. code-block:: 
   :copyable: true 

   atlas dbusers create  \
     --projectId "6698000acf48197e089e4085" \
     --username "MyRoleARN" \
     --awsIAMType "ROLE" \
     --role "clusterMonitor" \
     --scope "myCluster"