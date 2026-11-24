// start-enable-substring
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
                                     BCON_UTF8 ("substring"),
                                     "strMaxLength",
                                     BCON_INT32 (12),
                                     "strMinQueryLength",
                                     BCON_INT32 (3),
                                     "strMaxQueryLength",
                                     BCON_INT32 (6),
                                     "caseSensitive",
                                     BCON_BOOL (true),
                                     "diacriticSensitive",
                                     BCON_BOOL (true),
                                     "}",
                                     "}",
                                     "]");
// end-enable-substring

// start-query-substring
bson_t *filter = BCON_NEW ("$expr",
                           "{",
                           "$encStrContains",
                           "{",
                           "input",
                           BCON_UTF8 ("$patientRecord.ssn"),
                           "substring",
                           BCON_UTF8 ("-65-4"),
                           "}",
                           "}");
mongoc_cursor_t *cursor = mongoc_collection_find_with_opts (encrypted_collection, filter, NULL, NULL);

bson_t const *doc;
if (mongoc_cursor_next (cursor, &doc)) {
   char *json = bson_as_canonical_extended_json (doc, NULL);
   printf ("%s\n", json);
   bson_free (json);
} else {
   printf ("Document not found\n");
}
// end-query-substring
