var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
var kmsOptions = new Dictionary<string, object>
{
    { "email", _appSettings["Gcp:Email"] }, // Your GCP email
    { "privateKey", _appSettings["Gcp:PrivateKey"] } // Your GCP private key
};
kmsProviderCredentials.Add("gcp:my_gcp_provider", kmsOptions);