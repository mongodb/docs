val credential = MongoCredential.createGSSAPICredential("<username>")
    .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
