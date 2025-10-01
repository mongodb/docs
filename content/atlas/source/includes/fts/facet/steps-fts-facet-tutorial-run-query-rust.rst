.. procedure:: 
   :style: normal


   .. step:: Set up the file to run a |fts| facet query.

      a. In the ``src`` directory of your project, copy and paste the following
         code into the ``main.rs`` file.

         The following code example:

         - Imports ``mongodb``, the MongoDB Rust Driver, and the required
           BSON types for handling dates and documents.

         - Creates an instance of the ``Client`` class to establish a 
           connection to your cluster.

         - Uses the following to query the collection: 

           .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         - Iterates over the cursor to print the documents that match the 
           query.

         You can run this query in the :pipeline:`$searchMeta`. You can also run
         this query in the :pipeline:`$search` with the ``SEARCH_META``
         aggregation variable. 

         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. literalinclude:: /includes/fts/facet/tutorial.rs
                  :language: rust
                  :linenos:
                  :dedent:
                  :emphasize-lines: 9

            .. tab:: $search with $$SEARCH_META
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.rs
                  :language: rust
                  :linenos:
                  :dedent:
                  :emphasize-lines: 12

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the |fts| facet query that groups the genre and year fields into buckets.
  
      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell
           
            cargo run

         .. output::
            :language: rust
            :visible: true
           
            Document({
                "count": Document({
                    "lowerBound": Int64(
                        20874,
                    ),
                }),
                "facet": Document({
                    "genresFacet": Document({
                        "buckets": Array([
                            Document({
                                "_id": String(
                                    "Drama",
                                ),
                                "count": Int64(
                                    12146,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Comedy",
                                ),
                                "count": Int64(
                                    6436,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Romance",
                                ),
                                "count": Int64(
                                    3273,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Crime",
                                ),
                                "count": Int64(
                                    2429,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Thriller",
                                ),
                                "count": Int64(
                                    2400,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Action",
                                ),
                                "count": Int64(
                                    2348,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Adventure",
                                ),
                                "count": Int64(
                                    1875,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Documentary",
                                ),
                                "count": Int64(
                                    1754,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Horror",
                                ),
                                "count": Int64(
                                    1432,
                                ),
                            }),
                            Document({
                                "_id": String(
                                    "Biography",
                                ),
                                "count": Int64(
                                    1244,
                                ),
                            }),
                        ]),
                    }),
                    "yearFacet": Document({
                        "buckets": Array([
                            Document({
                                "_id": Int32(
                                    1910,
                                ),
                                "count": Int64(
                                    14,
                                ),
                            }),
                            Document({
                                "_id": Int32(
                                    1920,
                                ),
                                "count": Int64(
                                    47,
                                ),
                            }),
                            Document({
                                "_id": Int32(
                                    1930,
                                ),
                                "count": Int64(
                                    238,
                                ),
                            }),
                        ]),
                    }),
                }),
            })