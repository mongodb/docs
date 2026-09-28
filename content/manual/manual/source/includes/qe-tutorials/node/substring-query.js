// start-enable-substring
const collectionOpts = {
  encryptedFields: {
    fields: [
      {
        keyId: dek,
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { 
          queryType: "substring",
          strMaxLength: 12,
          strMinQueryLength: 3,
          strMaxQueryLength: 6,
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
    { input: "$patientRecord.ssn", substring: "-65-4" } 
  } 
})
// end-query-substring