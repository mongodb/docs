.. code-block:: javascript

   const app = new App(EDGE_APP_ID);

   await app.updateBaseUrl("http://localhost:80");

   // ... log in a user and use the app...
   // ... some time later...

   // Reset baseURL to the default: https://services.cloud.mongodb.com
   await app.updateBaseUrl(null);
