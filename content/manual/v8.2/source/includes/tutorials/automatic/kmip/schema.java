String dekId = "<paste-base-64-encoded-data-encryption-key-id>>";
Document jsonSchema = new Document().append("bsonType", "object").append("encryptMetadata",
new Document().append("keyId", new ArrayList<>((Arrays.asList(new Document().append("$binary", new Document()
       .append("base64", dekId)
       .append("subType", "04")))))))
.append("properties", new Document()
       .append("ssn", new Document().append("encrypt", new Document()
           .append("bsonType", "int")
           .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic")))
       .append("bloodType", new Document().append("encrypt", new Document()
           .append("bsonType", "string")
           .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
       .append("medicalRecords", new Document().append("encrypt", new Document()
           .append("bsonType", "array")
           .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
       .append("insurance", new Document()
               .append("bsonType", "object")
               .append("properties",
                       new Document().append("policyNumber", new Document().append("encrypt", new Document()
                       .append("bsonType", "int")
                       .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"))))));
HashMap<String, BsonDocument> schemaMap = new HashMap<String, BsonDocument>();
schemaMap.put("medicalRecords.patients", BsonDocument.parse(jsonSchema.toJson()));
