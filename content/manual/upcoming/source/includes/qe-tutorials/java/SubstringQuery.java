// start-enable-substring
BsonDocument encryptedFieldsMap = new BsonDocument().append("fields",
new BsonArray(Arrays.asList(
        new BsonDocument()
                .append("keyId", new BsonNull())
                .append("path", new BsonString("patientRecord.ssn"))
                .append("bsonType", new BsonString("string"))
                .append("queries", new BsonDocument()
                        .append("queryType", new BsonString("substringPreview"))
                        .append("strMaxLength", new BsonInt32(12))
                        .append("strMinQueryLength", new BsonInt32(3))
                        .append("strMaxQueryLength", new BsonInt32(10))
                        .append("caseSensitive", new BsonBoolean(true))
                        .append("diacriticSensitive", new BsonBoolean(true))))));
// end-enable-substring

// start-query-substring
Document filter = new Document("$expr", 
    new Document("$encStrContains", 
        new Document()
            .append("input", "$patientRecord.ssn")
            .append("substring", "-65-432")));
            
Patient findResult = collection.find(filter).first();

System.out.println(findResult);
// end-query-substring