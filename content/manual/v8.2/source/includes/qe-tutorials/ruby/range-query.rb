# frozen_string_literal: true

# This file contains code snippets demonstrating how to enable and use
# range queries with Queryable Encryption.

# start-enable-range
encrypted_fields_map = {
  encrypted_fields: {
    fields: [
      {
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { queryType: "equality" },
        keyId: nil
      },
      {
        path: "patientRecord.billing",
        bsonType: "object",
        keyId: nil
      },
      {
        path: "patientRecord.billAmount",
        bsonType: "int",
        queries: {
          queryType: "range",
          sparsity: 1,
          trimFactor: 4,
          min: 100,
          max: 2000
        },
        keyId: nil
      }
    ]
  }
}
# end-enable-range

# start-query-range
find_result = encrypted_collection.find(
  "patientRecord.billAmount" => { "$gt" => 1000, "$lt" => 2000 }
).first
puts find_result.inspect
# end-query-range
