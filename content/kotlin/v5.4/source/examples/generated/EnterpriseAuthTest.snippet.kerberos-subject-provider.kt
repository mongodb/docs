/* All MongoClient instances sharing this instance of KerberosSubjectProvider
will share a Kerberos ticket cache */
val myLoginContext = "myContext"
/* Login context defaults to "com.sun.security.jgss.krb5.initiate"
if unspecified in KerberosSubjectProvider */
val credential = MongoCredential.createGSSAPICredential("<Kerberos principal>")
    .withMechanismProperty(
        MongoCredential.JAVA_SUBJECT_PROVIDER_KEY,
        KerberosSubjectProvider(myLoginContext)
    )
