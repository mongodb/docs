using System.Collections.Generic;
using System.IO;

namespace CsfleTutorial;

public static class Config
{
    public const string ConnectionString = "<connection string>";
    public const string KeyVaultDb = "encryption";
    public const string KeyVaultColl = "__keyVault";
    public const string KeyVaultNamespace = KeyVaultDb + "." + KeyVaultColl;
    public const string MasterKeyPath = "master-key.txt";
    public const string DekIdPath = "dek_id.txt";
    public const string CryptSharedLibPath =
        "<Automatic Encryption Shared Library path>";

    public static Dictionary<string, IReadOnlyDictionary<string, object>>
        GetKmsProviders()
    {
        var localMasterKeyBytes = File.ReadAllBytes(MasterKeyPath);
        var localOptions = new Dictionary<string, object>
        {
            { "key", localMasterKeyBytes }
        };
        return new Dictionary<string, IReadOnlyDictionary<string, object>>
        {
            { "local", localOptions }
        };
    }
}
