using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static QueryableEncryption.QueryableEncryptionHelpers;

namespace QueryableEncryption;

public static class QueryableEncryptionTutorial
{
    public static async void RunExample()
    {
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);
        
        // start-setup-application-variables
        // KMS provider name should be one of the following: "aws", "gcp", "azure", "kmip" or "local"
        const string kmsProviderName = "<your KMS provider name>";
        const string keyVaultDatabaseName = "encryption";
        const string keyVaultCollectionName = "__keyVault";
        var keyVaultNamespace =
            CollectionNamespace.FromFullName($"{keyVaultDatabaseName}.{keyVaultCollectionName}");
        const string encryptedDatabaseName = "medicalRecords";
        const string encryptedCollectionName = "patients";
        var uri = Environment.GetEnvironmentVariable("MONGODB_URI"); // Your connection URI 
        // end-setup-application-variables
        
        var kmsProviderCredentials = GetKmsProviderCredentials(kmsProviderName,
            generateNewLocalKey: false);
        
        // start-create-client
        var clientSettings = MongoClientSettings.FromConnectionString(uri);
        clientSettings.AutoEncryptionOptions = GetAutoEncryptionOptions(
            keyVaultNamespace,
            kmsProviderCredentials);
        var encryptedClient = new MongoClient(clientSettings);
        // end-create-client
        
        var keyDatabase = encryptedClient.GetDatabase(keyVaultDatabaseName);

        // Drop the collection in case you created it in a previous run of this application.
        keyDatabase.DropCollection(keyVaultCollectionName);

        // start-encrypted-fields-map
        var encryptedFields = new BsonDocument
        {
            {
                "fields", new BsonArray
                {
                    new BsonDocument
                    {
                        { "keyId", BsonNull.Value },
                        { "path", "record.ssn" },
                        { "bsonType", "string" },
                        { "queries", new BsonDocument("queryType", "equality") } 
                    },
                    new BsonDocument
                    {
                        { "keyId", BsonNull.Value },
                        { "path", "record.billing" },
                        { "bsonType", "object" }
                    }
                }
            }
        };
        // end-encrypted-fields-map
        
        var patientDatabase = encryptedClient.GetDatabase(encryptedDatabaseName);
        var clientEncryption = GetClientEncryption(encryptedClient,
            keyVaultNamespace,
            kmsProviderCredentials);
        
        // start-create-encrypted-collection
        var createCollectionOptions = new CreateCollectionOptions<Patient>
        {
            EncryptedFields = encryptedFields 
        };
        
        clientEncryption.CreateEncryptedCollection(patientDatabase, 
            encryptedCollectionName,
            createCollectionOptions,
            kmsProviderName,
            GetCustomerMasterKeyCredentials(kmsProviderName));
        // end-create-encrypted-collection
        
        // start-insert-document
        var patient = new Patient
        {
            Name = "Jon Doe",
            Id = new ObjectId(),
            Record = new PatientRecord
            {
                Ssn = "987-65-4320",
                Billing = new PatientBilling
                {
                    CardType = "Visa",
                    CardNumber = 4111111111111111
                }
            }
        };

        var encryptedCollection = encryptedClient.GetDatabase(encryptedDatabaseName).
            GetCollection<Patient>(encryptedCollectionName);
        
        encryptedCollection.InsertOne(patient);
        // end-insert-document
    
        // start-find-document
        var ssnFilter = Builders<Patient>.Filter.Eq("record.ssn", patient.Record.Ssn);
        var findResult = await encryptedCollection.Find(ssnFilter).ToCursorAsync();

        Console.WriteLine(findResult.FirstOrDefault().ToJson());
        // end-find-document
    }
}
