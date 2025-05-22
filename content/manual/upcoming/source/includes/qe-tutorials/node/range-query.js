// start-enable-range
const encryptedFieldsMap = {
  encryptedFields: {
    fields: [
      {
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { queryType: "equality" },
      },
      {
        path: "patientRecord.billing",
        bsonType: "object",
      },
      {
        path: "patientRecord.billAmount",
        bsonType: "int",
        queries: {
          queryType: "range",
          sparsity: 1,
          trimFactor: 4,
          min: 100,
          max: 2000,
        },
      },
    ],
  },
};
// end-enable-range

// start-query-range
const findResult = await encryptedCollection.findOne({
  "patientRecord.billAmount": { $gt: 1000, $lt: 2000 },
});
console.log(findResult);
// end-query-range
