.. code-block::
   :copyable: true

   {
       "clusterType": "REPLICASET",
       "links": [],
       "name": "CustomerPortalProd",
       "replicationSpecs": [
         {
           "numShards": 1,
           "regionConfigs": [
             {
               "analyticsAutoScaling": {
                 "autoIndexing": {
                   "enabled": false
                 },
                 "compute": {
                   "enabled": true,
                   "maxInstanceSize": "M40",
                   "minInstanceSize": "M30",
                   "scaleDownEnabled": true
                 },
                 "diskGB": {
                   "enabled": true
                 }
               },
               "analyticsSpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "autoScaling": {
                 "autoIndexing": {
                   "enabled": false
                 },
                 "compute": {
                   "enabled": true,
                   "maxInstanceSize": "M40",
                   "minInstanceSize": "M30",
                   "scaleDownEnabled": true
                 },
                 "diskGB": {
                   "enabled": true
                 }
               },
               "electableSpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 3
               },
               "hiddenSecondarySpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "priority": 7,
               "providerName": "AWS",
               "readOnlySpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "regionName": "US_EAST_1"
             },
             {
               "analyticsAutoScaling": {
                 "autoIndexing": {
                   "enabled": false
                 },
                 "compute": {
                   "enabled": true,
                   "maxInstanceSize": "M40",
                   "minInstanceSize": "M30",
                   "scaleDownEnabled": true
                 },
                 "diskGB": {
                   "enabled": true
                 }
               },
               "analyticsSpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "autoScaling": {
                 "autoIndexing": {
                   "enabled": false
                 },
                 "compute": {
                   "enabled": true,
                   "maxInstanceSize": "M40",
                   "minInstanceSize": "M30",
                   "scaleDownEnabled": true
                 },
                 "diskGB": {
                   "enabled": true
                 }
               },
               "electableSpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 2
               },
               "hiddenSecondarySpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "priority": 6,
               "providerName": "GCP",
               "readOnlySpecs": {
                 "instanceSize": "M30",
                 "nodeCount": 0
               },
               "regionName": "EASTERN_US"
             }
           ],
           "zoneName": "Zone 1"
         }
       ]
   }