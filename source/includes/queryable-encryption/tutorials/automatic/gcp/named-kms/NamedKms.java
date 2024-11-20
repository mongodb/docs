Map<String, Object> kmsProviderDetails = new HashMap<>();
kmsProviderDetails.put("email", getEnv("GCP_EMAIL")); // Your GCP email
kmsProviderDetails.put("privateKey", getEnv("GCP_PRIVATE_KEY")); // Your GCP private key

Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
kmsProviderCredentials.put("gcp:my_gcp_provider", kmsProviderDetails);