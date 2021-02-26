.. code-block:: java

   /* all MongoClient instances sharing this instance of KerberosSubjectProvider
   will share a Kerberos ticket cache */
   String myLoginContext = "myContext";
   MongoCredential credential = MongoCredential.createGSSAPICredential(<username>);
   /* login context defaults to "com.sun.security.jgss.krb5.initiate"
   if unspecified in KerberosSubjectProvider */
   credential = credential.withMechanismProperty(MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
                                                 new KerberosSubjectProvider(myLoginContext));
