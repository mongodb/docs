.. code-block::
   :copyable: true

   {
       "clusterType": "REPLICASET",
       "links": [],
       "name": "CustomerPortalProd",
       "mongoDBMajorVersion": "8.0",
       "replicationSpecs": [
         {
           "numShards": 1,
           "regionConfigs": [
             {
               "electableSpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 3
               },
               "priority": 7,
               "providerName": "GCP",
               "regionName": "EASTERN_US",
               "analyticsSpecs": {
                 "nodeCount": 0,
                 "instanceSize": "M30"
               },
               "autoScaling": {
                 "compute": {
                   "enabled": false,
                   "scaleDownEnabled": false
                 },
                 "diskGB": {
                   "enabled": false
                 }
               },
               "readOnlySpecs": {
                 "nodeCount": 0,
                 "instanceSize": "M30"
               }
             }
           ],
           "zoneName": "Zone 1"
         }
       ]
     }