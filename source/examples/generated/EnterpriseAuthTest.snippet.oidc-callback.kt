val credential = MongoCredential.createOidcCredential(null)
    .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
        val accessToken = "..."
        OidcCallbackResult(accessToken)
    }
