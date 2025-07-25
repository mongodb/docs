.. code-block:: java

   MongoCredential credential = MongoCredential.createGSSAPICredential(<principal_username>);
   credential = credential.withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService");

