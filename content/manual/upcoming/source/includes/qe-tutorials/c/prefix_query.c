// start-enable-prefix
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
                                     BCON_UTF8 ("prefix"),
                                     "strMinQueryLength",
                                     BCON_INT32 (3),
                                     "strMaxQueryLength",
                                     BCON_INT32 (10),
                                     "caseSensitive",
                                     BCON_BOOL (true),
                                     "diacriticSensitive",
                                     BCON_BOOL (true),
                                     "}",
                                     "}",
                                     "]");
// end-enable-prefix

// start-query-prefix
bson_t *filter = BCON_NEW ("$expr",
                           "{",
                           "$encStrStartsWith",
                           "{",
                           "input",
                           BCON_UTF8 ("$patientRecord.ssn"),
                           "prefix",
                           BCON_UTF8 ("987"),
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
// end-query-prefix
