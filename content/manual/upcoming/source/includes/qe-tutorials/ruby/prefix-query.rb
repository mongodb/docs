# frozen_string_literal: true

# This file contains code snippets demonstrating how to enable and use
# prefix queries with Queryable Encryption.

# start-enable-prefix
collection_opts = {
  encrypted_fields: {
    fields: [
      {
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: {
          queryType: "prefix",
          strMinQueryLength: 3,
          strMaxQueryLength: 10,
          caseSensitive: true,
          diacriticSensitive: true
        },
        keyId: nil
      }
    ]
  }
}
# end-enable-prefix

# start-query-prefix
find_result = encrypted_collection.find(
  "$expr" => {
    "$encStrStartsWith" => {
      "input" => "$patientRecord.ssn",
      "prefix" => "987"
    }
  }
).first
puts find_result.inspect
# end-query-prefix
