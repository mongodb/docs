.Project(new BsonDocument
{
    { "ProductName", new BsonDocument("$first", "$ProductMapping.Name") },
    { "ProductCategory", new BsonDocument("$first", "$ProductMapping.Category") },
    { "OrderDate", 1 },
    { "CustomerId", 1 },
    { "Value", 1 },
    { "_id", 0 }
});
