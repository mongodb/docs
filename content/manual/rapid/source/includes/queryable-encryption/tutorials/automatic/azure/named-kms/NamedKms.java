Map<String, Object> kmsProviderDetails = new HashMap<>();
kmsProviderDetails.put("tenantId", getEnv("AZURE_TENANT_ID")); // Your Azure tenant ID
kmsProviderDetails.put("clientId", getEnv("AZURE_CLIENT_ID")); // Your Azure client ID
kmsProviderDetails.put("clientSecret", getEnv("AZURE_CLIENT_SECRET")); // Your Azure client secret

Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
kmsProviderCredentials.put("azure:my_azure_provider", kmsProviderDetails);