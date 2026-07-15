// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "connectionString",
//     "DotNetEnv.Env.GetString(\"CRYPT_SHARED_LIB_PATH\", \"\")": "Environment.GetEnvironmentVariable(\"CRYPT_SHARED_LIB_PATH\")",
//     "\"hospitalDb\"": "\"myDatabase\"",
//     "HospitalContext": "MyDbContext"
//   }
// }
namespace Examples.EfCore.QueryableEncryption;

using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;
using MongoDB.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.EntityFrameworkCore.Infrastructure;

public static class QueryableEncryptionSetup
{
    public static void RegisterAutoEncryption()
    {
        // :snippet-start: register-auto-encryption
        MongoClientSettings.Extensions.AddAutoEncryption();
        // :snippet-end:
    }

    public static DbContextOptions<HospitalContext> ConfigureEncryptionOptions(
        byte[] localMasterKey)
    {
        // :snippet-start: configure-encryption-options
        var kmsProviders = new Dictionary<
            string, IReadOnlyDictionary<string, object>>
        {
            {
                "local",
                new Dictionary<string, object>
                {
                    { "key", localMasterKey }
                }
            }
        };

        var keyVaultNamespace = CollectionNamespace.FromFullName(
            "encryption.__keyVault");

        var mongoOptions = new MongoOptionsExtension()
            .WithConnectionString(DotNetEnv.Env.GetString("CONNECTION_STRING"))
            .WithDatabaseName("hospitalDb")
            .WithKmsProviders(kmsProviders)
            .WithKeyVaultNamespace(keyVaultNamespace)
            .WithCryptProvider(
                CryptProvider.AutoEncryptSharedLibrary,
                DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", ""));

        var optionsBuilder = new DbContextOptionsBuilder<HospitalContext>()
            .UseMongoDB(mongoOptions);
        // :snippet-end:
        optionsBuilder.ConfigureWarnings(
            w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning));

        return optionsBuilder.Options;
    }
}
// :replace-end:
