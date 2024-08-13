val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
    .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "myService")
