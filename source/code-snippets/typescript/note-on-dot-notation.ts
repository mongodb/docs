// start-no-doc
// returns no documents
collection.find({ field: { s1: "hi" } });
// end-no-doc
// start-doc
// returns your document (uses dot notation)
collection.find({ "field.s1": "hi" });

// returns your document (does not use dot notation)
collection.find({
  $jsonSchema: {
    required: ["field"],
    properties: {
      field: { bsonType: "object", properties: { s1: { enum: ["hi"] } } },
    },
  },
});
// end-doc
