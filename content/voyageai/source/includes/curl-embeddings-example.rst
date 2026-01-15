.. code-block:: bash

   curl \
     --request POST 'https://ai.mongodb.com/v1/embeddings' \
     --header "Authorization: Bearer $VOYAGE_API_KEY" \
     --header "Content-Type: application/json" \
     --data '{
       "input": [
         "MongoDB is redefining what a database is in the AI era.",
         "Voyage AI embedding and reranking models are state-of-the-art."
       ],
       "model": "voyage-4-large"
     }'

