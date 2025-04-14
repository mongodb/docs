using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption;

public static class QueryableEncryptionTutorial
{
    public static async void RunExample()
    {
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // start-setup-application-variables
        const string kmsProviderName = "<your KMS provider name>";
        const string keyVaultDatabaseName = "encryption";
        const string keyVaultCollectionName = "__keyVault";
        var keyVaultNamespace =
            CollectionNamespace.FromFullName($"{keyVaultDatabaseName}.{keyVaultCollectionName}");
        const string encryptedDatabaseName = "medicalRecords";
        const string encryptedCollectionName = "patients";

        var appSettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var uri = appSettings["MongoDbUri"];
        // end-setup-application-variables

        var qeHelpers = new QueryableEncryptionHelpers(appSettings);
        var kmsProviderCredentials = qeHelpers.GetKmsProviderCredentials(kmsProviderName,
            generateNewLocalKey: true);

        // start-create-client
        MongoClientSettings.Extensions.AddAutoEncryption(); // .NET/C# Driver v3.0 or later only
        var clientSettings = MongoClientSettings.FromConnectionString(uri);
        clientSettings.AutoEncryptionOptions = qeHelpers.GetAutoEncryptionOptions(
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
                        { "path", "patientRecord.ssn" },
                        { "bsonType", "string" },
                        { "queries", new BsonDocument("queryType", "equality") }
                    },
                    new BsonDocument
                    {
                        { "keyId", BsonNull.Value },
                        { "path", "patientRecord.billing" },
                        { "bsonType", "object" }
                    }
                }
            }
        };
        // end-encrypted-fields-map

        var patientDatabase = encryptedClient.GetDatabase(encryptedDatabaseName);
        patientDatabase.DropCollection(encryptedCollectionName);

        var clientEncryption = qeHelpers.GetClientEncryption(encryptedClient,
            keyVaultNamespace,
            kmsProviderCredentials);

        var customerMasterKeyCredentials = qeHelpers.GetCustomerMasterKeyCredentials(kmsProviderName);

        try
        {
            // start-create-encrypted-collection
            var createCollectionOptions = new CreateCollectionOptions<Patient>
            {
                EncryptedFields = encryptedFields
            };

            clientEncryption.CreateEncryptedCollection(patientDatabase,
                encryptedCollectionName,
                createCollectionOptions,
                kmsProviderName,
                customerMasterKeyCredentials);
            // end-create-encrypted-collection
        }
        catch (Exception e)
        {
            throw new Exception("Unable to create encrypted collection due to the following error: " + e.Message);
        }

        // start-insert-document
        var patient = new Patient
        {
            PatientName = "Jon Doe",
            Id = new ObjectId(),
            PatientRecord = new PatientRecord
            {
                Ssn = "987-65-4320",
                Billing = new PatientBilling
                {
                    CardType = "Visa",
                    CardNumber = 4111111111111111,
                },
                BillAmount = 1500
            }
        };

        var encryptedCollection = encryptedClient.GetDatabase(encryptedDatabaseName).
            GetCollection<Patient>(encryptedCollectionName);

        encryptedCollection.InsertOne(patient);
        // end-insert-document

        // start-find-document
        var ssnFilter = Builders<Patient>.Filter.Eq("patientRecord.ssn", patient.PatientRecord.Ssn);
        var findResult = await encryptedCollection.Find(ssnFilter).ToCursorAsync();

        Console.WriteLine(findResult.FirstOrDefault().ToJson());
        // end-find-document
    }
}
