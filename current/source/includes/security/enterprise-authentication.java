// start-gssapi-connection-string
MongoClient mongoClient = MongoClients
    .create("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI");
// end-gssapi-connection-string

// start-gssapi-mongocredential
MongoCredential credential = MongoCredential.createGSSAPICredential("<username>");

MongoClient mongoClient = MongoClients.create(
    MongoClientSettings.builder()
        .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
        .credential(credential)
        .build());
// end-gssapi-mongocredential

// start-gssapi-connection-string-properties
MongoClient mongoClient = MongoClients
    .create("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService");
// end-gssapi-connection-string-properties

// start-gssapi-service-key
MongoCredential credential = MongoCredential
    .createGSSAPICredential("<username>");
credential = credential
    .withMechanismProperty(MongoCredential.SERVICE_NAME_KEY, "<myService>");
// end-gssapi-service-key

// start-gssapi-subject-key
LoginContext loginContext = new LoginContext(<LoginModule implementation from JAAS config>);
loginContext.login();
Subject subject = loginContext.getSubject();

MongoCredential credential = MongoCredential
    .createGSSAPICredential("<username>");
credential = credential
    .withMechanismProperty(MongoCredential.JAVA_SUBJECT_KEY, subject);
// end-gssapi-subject-key

// start-gssapi-ticket-cache
/* All MongoClient instances sharing this instance of KerberosSubjectProvider
will share a Kerberos ticket cache */
String myLoginContext = "myContext";
MongoCredential credential = MongoCredential
    .createGSSAPICredential(<username>);

/* Login context defaults to "com.sun.security.jgss.krb5.initiate"
if unspecified in KerberosSubjectProvider */
credential = credential
    .withMechanismProperty(MongoCredential.JAVA_SUBJECT_PROVIDER_KEY, 
        new KerberosSubjectProvider(myLoginContext));
// end-gssapi-ticket-cache

// start-ldap-connection-string
MongoClient mongoClient = MongoClients
    .create("<ldap_username>:<ldap_password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN");
// end-ldap-connection-string

// start-ldap-mongocredential
MongoCredential credential = MongoCredential
    .createPlainCredential(<ldap_username>, "$external", <ldap_password>);

MongoClient mongoClient = MongoClients.create(
    MongoClientSettings.builder()
        .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
        .credential(credential)
        .build());
// end-ldap-mongocredential

// start-azure-oidc-connection-string
MongoClient mongoClient = MongoClients.create(
            "mongodb://<username>@<hostname>:<port>/?" + 
            "?authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>");
// end-azure-oidc-connection-string

// start-azure-oidc-mongocredential
MongoCredential credential = MongoCredential.createOidcCredential("<username>")
.withMechanismProperty("ENVIRONMENT", "azure")  
.withMechanismProperty("TOKEN_RESOURCE", "<audience>");

MongoClient mongoClient = MongoClients.create(
 MongoClientSettings.builder()
     .applyToClusterSettings(builder ->
             builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
     .credential(credential)
     .build());
// end-azure-oidc-mongocredential

// start-gcp-oidc-connection-string
MongoClient mongoClient = MongoClients.create(
    "mongodb://<hostname>:<port>/?" +
    "authMechanism=MONGODB-OIDC" +
    "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>");
// end-gcp-oidc-connection-string

// start-gcp-oidc-mongocredential
MongoCredential credential = MongoCredential.createOidcCredential()
            .withMechanismProperty("ENVIRONMENT", "gcp")
            .withMechanismProperty("TOKEN_RESOURCE", "<audience>");
   
MongoClient mongoClient = MongoClients.create(
    MongoClientSettings.builder()
        .applyToClusterSettings(builder ->
                builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
        .credential(credential)
        .build());
// end-gcp-oidc-mongocredential

// start-oidc-callback-create
MongoCredential credential = MongoCredential.createOidcCredential(null)
    .withMechanismProperty("OIDC_CALLBACK", (context) ->  {
       String accessToken = ...
       return new OidcCallbackResult(accessToken);
});
// end-oidc-callback-create

// start-oidc-callback
MongoCredential credential = MongoCredential.createOidcCredential(null)
      .withMechanismProperty("OIDC_CALLBACK", (context) ->  {
         string accessToken = new String(Files.readAllBytes(Paths.get("access-token.dat"));
         return new OidcCallbackResult(accessToken);
      });

   MongoClient mongoClient = MongoClients.create(
       MongoClientSettings.builder()
           .applyToClusterSettings(builder ->
                   builder.hosts(Arrays.asList(new ServerAddress("<hostname>", <port>))))
           .credential(credential)
           .build());
// end-oidc-callback