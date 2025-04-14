MongoDB uses :ref:`schema validation <schema-validation-overview>` to enforce
encryption of specific fields in a collection. Without a client-side schema,
the client downloads the server-side schema for the collection to determine 
which fields to encrypt. To avoid this issue, use client-side schema validation.

Because {+csfle-abbrev+} and {+qe+} do not provide a mechanism to verify
the integrity of a schema, relying on a server-side schema means
trusting that the server's schema has not been tampered with. If an adversary
compromises the server, they can modify the schema so that a previously
encrypted field is no longer labeled for encryption. This causes the client 
to send plaintext values for that field.