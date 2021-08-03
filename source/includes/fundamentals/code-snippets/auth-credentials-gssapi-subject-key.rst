.. code-block:: java

   LoginContext loginContext = new LoginContext(<LoginModule implementation from JAAS config>);
   loginContext.login();
   Subject subject = loginContext.getSubject();

   MongoCredential credential = MongoCredential.createGSSAPICredential(<username>);
   credential = credential.withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject);

