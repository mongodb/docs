// start-enable-range
BsonDocument encryptedFieldsMap = new BsonDocument().append("fields",
new BsonArray(Arrays.asList(
        new BsonDocument()
                .append("keyId", new BsonNull())
                .append("path", new BsonString("patientRecord.ssn"))
                .append("bsonType", new BsonString("string"))
                .append("queries", new BsonDocument()
                        .append("queryType", new BsonString("equality"))),
        new BsonDocument()
                .append("keyId", new BsonNull())
                .append("path", new BsonString("patientRecord.billing"))
                .append("bsonType", new BsonString("object")),
        new BsonDocument()
                .append("keyId", new BsonNull())
                .append("path", new BsonString("patientRecord.billAmount"))
                .append("bsonType", new BsonString("int"))
                .append("queries", new BsonDocument()
                        .append("queryType", new BsonString("range"))
                        .append("sparsity", new BsonInt32(1))
                        .append("trimFactor", new BsonInt32(4))
                        .append("min", new BsonInt32(100))
                        .append("max", new BsonInt32(2000))
                ))));
// end-enable-range

// start-query-range
Document filter = new Document("patientRecord.billAmount",
    new Document("$gt", 1000).append("$lt", 2000));
Patient findResult = collection.find(filter).first();

System.out.println(findResult);
// end-query-range