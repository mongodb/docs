// start-enable-range
bson_t *encrypted_fields = BCON_NEW ("fields",
                                     "[",
                                     "{",
                                     "path",
                                     BCON_UTF8 ("patientRecord.ssn"),
                                     "bsonType",
                                     BCON_UTF8 ("string"),
                                     "keyId",
                                     BCON_NULL,
                                     "queries",
                                     "{",
                                     "queryType",
                                     BCON_UTF8 ("equality"),
                                     "}",
                                     "}",
                                     "{",
                                     "path",
                                     BCON_UTF8 ("patientRecord.billing"),
                                     "bsonType",
                                     BCON_UTF8 ("object"),
                                     "keyId",
                                     BCON_NULL,
                                     "}",
                                     "{",
                                     "path",
                                     BCON_UTF8 ("patientRecord.billAmount"),
                                     "bsonType",
                                     BCON_UTF8 ("int"),
                                     "keyId",
                                     BCON_NULL,
                                     "queries",
                                     "{",
                                     "queryType",
                                     BCON_UTF8 ("range"),
                                     "sparsity",
                                     BCON_INT64 (1),
                                     "min",
                                     BCON_INT32 (100),
                                     "max",
                                     BCON_INT32 (2000),
                                     "trimFactor",
                                     BCON_INT32 (4),
                                     "}",
                                     "}",
                                     "]");
// end-enable-range

// start-query-range
bson_t *filter = BCON_NEW ("$and",
                           "[",
                           "{",
                           "patientRecord.billAmount",
                           "{",
                           "$gt",
                           BCON_INT32 (1000),
                           "}",
                           "}",
                           "{",
                           "patientRecord.billAmount",
                           "{",
                           "$lt",
                           BCON_INT32 (2000),
                           "}",
                           "}",
                           "]");
mongoc_cursor_t *cursor = mongoc_collection_find_with_opts (encrypted_collection, filter, NULL, NULL);

bson_t const *doc;
if (mongoc_cursor_next (cursor, &doc)) {
   char *json = bson_as_canonical_extended_json (doc, NULL);
   printf ("%s\n", json);
   bson_free (json);
} else {
   printf ("Document not found\n");
}
// end-query-range
