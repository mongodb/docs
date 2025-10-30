.. procedure::
   :style: normal
    
   .. step:: Send a ``POST`` request.
    
      Send a ``POST`` request to the ``search/indexes`` 
      :oas-bump-atlas-op:`endpoint <creategroupclustersearchindex>`.

      .. code-block:: sh

         curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
           --header "Accept: application/json" \
           --header "Content-Type: application/json" \
           --include \
           --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
           --data '
                {
                "collectionName": "<collection-name>",
                "database": "<database-name>",
                "name": "<index-name>",
                "type": "search",
                "definition": 
                {
                    "analyzer": "<analyzer-name>",
                    "searchAnalyzer": "<analyzer-name>",
                    "mappings": {
                    "dynamic": <boolean>,
                    "fields": { <field-definition> }
                    },
                    "numPartitions": <integer>,
                    "analyzers": [ {
                        <custom-analyzer-definition>
                    }
                    ],
                    "storedSource": <boolean> | {
                    <stored-source-definition>
                    },
                    "synonyms": [
                    {
                        <synonym-mapping-definition>
                    }
                    ]
                }
              }'

      To learn more about the syntax and parameters for this 
      endpoint, see :oas-bump-atlas-op:`Create One 
      <creategroupclustersearchindex>`.

   .. step:: Review the response.

      :gold:`IMPORTANT:` {+service+} doesn't create the index if the collection 
      doesn't exist, but it still returns a ``200`` status.