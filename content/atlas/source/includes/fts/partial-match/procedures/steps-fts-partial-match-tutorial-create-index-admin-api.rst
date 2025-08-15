Run the following Admin API command to create the search index. Replace the
``<projectId>``, and ``<clusterName>`` with your actual values.

.. code-block:: bash

  curl --user "${PUBLIC_KEY}:${PRIVATE_KEY}" \
    --digest \
    --header "Accept: application/vnd.atlas.2025-03-12+json" \
    --header "Content-Type: application/json" \
    -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/<projectId>/clusters/<clusterName>/search/indexes" \
    -d '{
      "name": "partial-match-tutorial",
      "database": "sample_mflix",
      "collectionName": "movies",
      "definition": {
        "mappings": {
          "dynamic": false,
          "fields": {
            "plot": {
              "type": "string"
            }
          }
        }
      }
    }'
