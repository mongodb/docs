// start-enable-prefix
BsonDocument encryptedFieldsMap = new BsonDocument().append("fields",
new BsonArray(Arrays.asList(
        new BsonDocument()
                .append("keyId", new BsonNull())
                .append("path", new BsonString("patientRecord.ssn"))
                .append("bsonType", new BsonString("string"))
                .append("queries", new BsonDocument()
                        .append("queryType", new BsonString("prefixPreview"))
                        .append("strMinQueryLength", new BsonInt32(3))
                        .append("strMaxQueryLength", new BsonInt32(10))
                        .append("caseSensitive", new BsonBoolean(true))
                        .append("diacriticSensitive", new BsonBoolean(true))))));
// end-enable-prefix

// start-query-prefix
Document filter = new Document("$expr", 
    new Document("$encStrStartsWith", 
        new Document()
            .append("input", "$patientRecord.ssn")
            .append("prefix", "987")));
            
Patient findResult = collection.find(filter).first();

System.out.println(findResult);
// end-query-prefix