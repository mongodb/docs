using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

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

        var appSettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        var uri = appSettings["MongoDbUri"];
        // end-setup-application-variables

        var qeHelpers = new QueryableEncryptionHelpers(appSettings);
        var kmsProviderCredentials = qeHelpers.GetKmsProviderCredentials(kmsProviderName,
            generateNewLocalKey: true);

        // start-create-client
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
