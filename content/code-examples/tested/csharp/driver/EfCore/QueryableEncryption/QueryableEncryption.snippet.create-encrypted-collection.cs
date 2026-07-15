var encryptedSchemas =
    QueryableEncryptionSchemaGenerator.GenerateSchemas(
        context.Model);

using var client = new MongoClient(
    "<connection string URI>");
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
