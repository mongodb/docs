var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
var kmsOptions = new Dictionary<string, object>
{
    { "endpoint", _appSettings["Kmip:KmsEndpoint"] } // Your KMIP KMS endpoint
};
kmsProviderCredentials.Add("kmip:my_kmip_provider", kmsOptions);