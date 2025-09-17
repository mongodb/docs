// start-enable-prefix
const encryptedFieldsMap = {
  encryptedFields: {
    fields: [
      {
        keyId: dek,
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { 
          queryType: "prefixPreview",
          strMinQueryLength: 3,
          strMaxQueryLength: 10,
          caseSensitive: true,
          diacriticSensitive: true,
        },
      },
    ],
  },
};
// end-enable-prefix

// start-query-prefix
const findResult = await encryptedCollection.findOne(
  { $expr: { $encStrStartsWith: 
    { input: "$patientRecord.ssn", prefix: "987" } 
  } 
})
// end-query-prefix