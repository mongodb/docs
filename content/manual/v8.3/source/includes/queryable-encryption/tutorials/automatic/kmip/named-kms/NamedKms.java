Map<String, Object> kmsProviderDetails = new HashMap<>();
kmsProviderDetails.put("endpoint", getEnv("KMIP_KMS_ENDPOINT")); // Your KMIP KMS endpoint

Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
kmsProviderCredentials.put("kmip:my_kmip_provider", kmsProviderDetails);