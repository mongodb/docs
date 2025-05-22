var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
var kmsOptions = new Dictionary<string, object>
{
    { "tenantId", _appSettings["Azure:TenantId"] }, // Your Azure tenant ID
    { "clientId", _appSettings["Azure:ClientId"] }, // Your Azure client ID
    { "clientSecret", _appSettings["Azure:ClientSecret"] } // Your Azure client secret
};
kmsProviderCredentials.Add("azure:my_azure_provider", kmsOptions);