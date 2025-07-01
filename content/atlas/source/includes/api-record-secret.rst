After you've created the service account, copy and save the ``{CLIENT-ID}`` and 
``{CLIENT-SECRET}`` from the output, which should look similar to the following example.
*This is the only time you can view the full client secret.* You'll need this information
when you :ref:`make an API request <example-api-request>`. 

.. code-block:: sh

   {
     "createdAt" : "2024-04-23T17:47:17Z",
     "description" : "Service account for my organization.",
     "clientId" : "{CLIENT-ID}",
     "name" : "My Service Account",
     "roles" : [ "ORG_MEMBER" ],
     "secrets" : [ {
       "createdAt" : "2024-04-23T17:47:17Z",
       "expiresAt" : "2024-12-01T00:00:00Z",
       "id" : "6627f7259d39d858378c9e30",
       "lastUsedAt" : null,
       "secret" : "{CLIENT-SECRET}"
      } ]
   }%        
