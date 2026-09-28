# frozen_string_literal: true

# This file contains code snippets demonstrating how to enable and use
# substring queries with Queryable Encryption.

# start-enable-substring
collection_opts = {
  encrypted_fields: {
    fields: [
      {
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: {
          queryType: "substring",
          strMaxLength: 12,
          strMinQueryLength: 3,
          strMaxQueryLength: 6,
          caseSensitive: true,
          diacriticSensitive: true
        },
        keyId: nil
      }
    ]
  }
}
# end-enable-substring

# start-query-substring
find_result = encrypted_collection.find(
  "$expr" => {
    "$encStrContains" => {
      "input" => "$patientRecord.ssn",
      "substring" => "-65-4"
    }
  }
).first
puts find_result.inspect
# end-query-substring
