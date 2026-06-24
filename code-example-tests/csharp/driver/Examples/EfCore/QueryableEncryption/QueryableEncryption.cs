// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string URI>\"",
//     "DotNetEnv.Env.GetString(\"CRYPT_SHARED_LIB_PATH\", \"\")": "Environment.GetEnvironmentVariable(\"CRYPT_SHARED_LIB_PATH\")"
//   }
// }
namespace Examples.EfCore.QueryableEncryption;

using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;
using MongoDB.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.EntityFrameworkCore.Infrastructure;

// :snippet-start: patient-entity
public class Patient
{
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public string SSN { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
}
// :snippet-end:

// :snippet-start: hospital-context
public class HospitalContext : DbContext
{
    public DbSet<Patient> Patients { get; set; } = null!;
    private readonly Guid _ssnDataKeyId;
    private readonly Guid _dobDataKeyId;

    public HospitalContext(
        DbContextOptions options,
        Guid ssnDataKeyId,
        Guid dobDataKeyId)
        : base(options)
    {
        _ssnDataKeyId = ssnDataKeyId;
        _dobDataKeyId = dobDataKeyId;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Patient>(entity =>
        {
            entity.ToCollection("patients");
            entity.Property(p => p.SSN)
                  .IsEncrypted(_ssnDataKeyId);

            entity.Property(p => p.DateOfBirth)
                  .IsEncryptedForRange(
                      new DateTime(1900, 1, 1),
                      new DateTime(2100, 12, 31),
                      _dobDataKeyId);
        });
    }
}
// :snippet-end:

public class QueryableEncryptionExample
{
    public List<Patient> InsertAndQuery(
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders,
        CollectionNamespace keyVaultNamespace,
        Guid ssnDataKeyId,
        Guid dobDataKeyId)
    {
        // :snippet-start: insert-and-query
        var mongoOptions = new MongoOptionsExtension()
            .WithConnectionString(DotNetEnv.Env.GetString("CONNECTION_STRING"))
            .WithDatabaseName("hospitalDb")
            .WithKmsProviders(kmsProviders)
            .WithKeyVaultNamespace(keyVaultNamespace)
            .WithCryptProvider(
                CryptProvider.AutoEncryptSharedLibrary,
                DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", ""));

        using var context = new HospitalContext(
            new DbContextOptionsBuilder<HospitalContext>()
                .UseMongoDB(mongoOptions)
                .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)) // :remove:
                .Options,
            ssnDataKeyId,
            dobDataKeyId);

        context.Database.EnsureCreated();
        context.Patients.Add(new Patient
        {
            Name = "John Doe",
            SSN = "123-45-6789",
            DateOfBirth = new DateTime(1985, 6, 15)
        });
        context.SaveChanges();

        var results = context.Patients
            .Where(p => p.DateOfBirth > new DateTime(1980, 1, 1))
            .ToList();
        // :snippet-end:

        return results; // :remove:
    }

    public void CreateEncryptedCollection(
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders,
        CollectionNamespace keyVaultNamespace,
        Guid ssnDataKeyId,
        Guid dobDataKeyId)
    {
        var mongoOptions = new MongoOptionsExtension()
            .WithConnectionString(DotNetEnv.Env.GetString("CONNECTION_STRING"))
            .WithDatabaseName("hospitalDb")
            .WithKmsProviders(kmsProviders)
            .WithKeyVaultNamespace(keyVaultNamespace)
            .WithCryptProvider(
                CryptProvider.AutoEncryptSharedLibrary,
                DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", ""));

        using var context = new HospitalContext(
            new DbContextOptionsBuilder<HospitalContext>()
                .UseMongoDB(mongoOptions)
                .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)) // :remove:
                .Options,
            ssnDataKeyId,
            dobDataKeyId);

        // :snippet-start: create-encrypted-collection
        var encryptedSchemas =
            QueryableEncryptionSchemaGenerator.GenerateSchemas(
                context.Model);

        using var client = new MongoClient(
            DotNetEnv.Env.GetString("CONNECTION_STRING"));
        var database = client.GetDatabase("hospitalDb");

        foreach (var entityType in context.Model
            .GetEntityTypes()
            .Where(e => e.IsDocumentRoot()))
        {
            var collectionName = entityType.GetCollectionName();
            if (encryptedSchemas.TryGetValue(
                    collectionName, out var schema))
            {
                database.CreateCollection(
                    collectionName,
                    new CreateCollectionOptions
                    {
                        EncryptedFields = schema
                    });
            }
        }

        context.Database.EnsureCreated();
        // :snippet-end:
    }

    public List<Patient> QueryWithIgnoreMode(
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders,
        CollectionNamespace keyVaultNamespace,
        Guid ssnDataKeyId,
        Guid dobDataKeyId)
    {
        // :snippet-start: ignore-mode-config
        var mongoOptions = new MongoOptionsExtension()
            .WithConnectionString(DotNetEnv.Env.GetString("CONNECTION_STRING"))
            .WithDatabaseName("hospitalDb")
            .WithKmsProviders(kmsProviders)
            .WithKeyVaultNamespace(keyVaultNamespace)
            .WithCryptProvider(
                CryptProvider.AutoEncryptSharedLibrary,
                DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", ""))
            .WithQueryableEncryptionSchemaMode(
                QueryableEncryptionSchemaMode.Ignore);
        // :snippet-end:

        using var context = new HospitalContext(
            new DbContextOptionsBuilder<HospitalContext>()
                .UseMongoDB(mongoOptions)
                .ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)) // :remove:
                .Options,
            ssnDataKeyId,
            dobDataKeyId);

        return context.Patients.ToList(); // :remove:
    }
}
// :replace-end:
