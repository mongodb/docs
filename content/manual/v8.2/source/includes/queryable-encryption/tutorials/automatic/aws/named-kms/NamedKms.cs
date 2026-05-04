var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
var kmsOptions = new Dictionary<string, object>
    {
        { "accessKeyId", _appSettings["Aws:AccessKeyId"] }, // Your AWS access key ID
        { "secretAccessKey", _appSettings["Aws:SecretAccessKey"] } // Your AWS secret access key
    };
kmsProviderCredentials.Add("aws:my_aws_provider", kmsOptions);