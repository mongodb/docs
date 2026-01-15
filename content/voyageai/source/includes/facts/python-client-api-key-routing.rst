:gold:`NOTE:` The Python client automatically routes requests to the correct API endpoint based 
on the API key format:

- :ref:`Model API keys <voyage-api-keys>` created in MongoDB Atlas route to the ``https://ai.mongodb.com/`` endpoints.
- API keys created on the Voyage platform route to the ``https://api.voyageai.com/`` endpoints.

You can override this behavior by setting the 
``base_url`` parameter when creating the client.
