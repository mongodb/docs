.. code-block:: java

   MongoCredential credential = MongoCredential.createGSSAPICredential(<db_username>);
   credential = credential.withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService");

