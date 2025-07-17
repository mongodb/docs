curl <host>:<port>/api/v1/start -XPOST \
--data '
   {
      "source": "cluster0",
      "destination": "cluster1"
      "namespaceRemap": [
         {
            "from": {
               "database": "<source-database>"
            },
            "to": {
               "database": "<destination-database>"
            }
         }
      ]
   } '
