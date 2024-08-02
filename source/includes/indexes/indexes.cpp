// start-index-single
auto index_specification = make_document(kvp("title", 1));
collection.create_index(index_specification.view());
// end-index-single

// start-remove-index
collection.indexes().drop_one("title_1");
// end-remove-index

// start-remove-all-indexes
collection.indexes().drop_all();
// end-remove-all-indexes

// start-remove-all-wildcard
collection.indexes().drop_one("*");
// end-remove-all-wildcard