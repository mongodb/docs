// start-enable-substring
const encryptedFieldsMap = {
  encryptedFields: {
    fields: [
      {
        keyId: dek,
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { 
          queryType: "substringPreview",
          strMaxLength: 12,
          strMinQueryLength: 3,
          strMaxQueryLength: 10,
          caseSensitive: true,
          diacriticSensitive: true,
        },
      },
    ],
  },
};
// end-enable-substring

// start-query-substring
const findResult = await encryptedCollection.findOne(
  { $expr: { $encStrContains: 
    { input: "$patientRecord.ssn", substring: "-65-432" } 
  } 
})
// end-query-substring