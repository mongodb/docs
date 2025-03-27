.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed 
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``schools`` collection in the ``local_school_district`` database.

      On the :guilabel:`Database` screen, click the 
      ``local_school_district`` database, and then click the ``schools`` 
      collection.

   .. step:: Run the following |fts| queries against the ``schools`` collection.

      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`. 

      .. tabs:: 

         .. tab:: Nested Array 
            :tabid: basic

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. list-table::
               :header-rows: 1
               :widths: 15 85

               * - Pipeline Stage
                 - Query

               * - ``$search``
                 - .. code-block:: javascript

                      {
                        "index": "embedded-documents-tutorial",
                        "embeddedDocument": {
                          "path": "teachers",
                          "operator": {
                            "compound": {
                              "must": [{
                                "text": {
                                  "path": "teachers.first",
                                  "query": "John"
                                }
                              }],
                              "should":[{
                                "text": {
                                  "path": "teachers.last",
                                  "query": "Smith"
                                }
                              }]
                            }
                          }
                        },
                        "highlight": {
                          "path": "teachers.last"
                        }
                      }

               * - ``$project``
                 - .. code-block:: javascript
                    
                      {
                        "_id": 1,
                        "teachers": 1,
                        "score": { $meta: "searchScore" },
                        "highlights": { "$meta": "searchHighlights" }
                      }


                   If you enabled :guilabel:`Auto Preview`, |compass| 
                   displays the following documents next to the 
                   :pipeline:`$project` pipeline stage:

            .. literalinclude:: /includes/fts/embedded-document/simple-mongosh-query-results.sh 
               :language: shell
               :linenos:  

            .. include:: /includes/fts/extracts/fts-embedded-document-basic-query-results.rst

         .. tab:: Nested Array Within Object
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. list-table::
               :header-rows: 1
               :widths: 15 85

               * - Pipeline Stage
                 - Query

               * - ``$search``
                 - .. code-block:: javascript

                      {
                        "index": "embedded-documents-tutorial",
                        embeddedDocument: {
                          path: "clubs.sports",
                          operator: {
                            queryString: {
                              defaultPath: "clubs.sports.club_name",
                              query: "dodgeball OR frisbee",
                            }
                          }
                        }
                      }

               * - ``$project``
                 - .. code-block:: javascript
                    
                      {
                        "_id": 1,
                        "name": 1,
                        "clubs.sports": 1,
                        "score": { $meta: "searchScore" }
                      }

                   If you enabled :guilabel:`Auto Preview`, |compass| 
                   displays the following documents next to the 
                   :pipeline:`$project` pipeline stage:

            .. literalinclude:: /includes/fts/embedded-document/complex-mongosh-query-results.sh 
               :language: shell
               :linenos:  

            .. include:: /includes/fts/extracts/fts-embedded-document-complex-query-results.rst 

         .. tab:: Nested Array Within Array 
            :tabid: nestedarray

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. list-table::
               :header-rows: 1
               :widths: 15 85

               * - Pipeline Stage
                 - Query

               * - ``$search``
                 - .. code-block:: javascript

                      {
                        "index": "embedded-documents-tutorial",
                        "embeddedDocument": {
                          "path": "teachers",
                          "operator": {
                            "compound": {
                              "must": [{
                                "embeddedDocument": {
                                  "path": "teachers.classes",
                                  "operator": {
                                    "compound": {
                                      "must": [{
                                        "text": {
                                          "path": "teachers.classes.grade",
                                          "query": "12th"
                                        }
                                      },
                                      {
                                        "text": {
                                          "path": "teachers.classes.subject",
                                          "query": "science"
                                        }
                                      }]
                                    }
                                  }
                                }
                              }],
                              "should": [{
                                "text": {
                                  "path": "teachers.last",
                                  "query": "smith"
                                }
                              }]
                            }
                          }
                        },
                        "highlight": {
                          "path": "teachers.classes.subject"
                        }
                      }

               * - ``$project``
                 - .. code-block:: javascript
                    
                      {
                        "_id": 1,
                        "teachers": 1,
                        "score": { $meta: "searchScore" },
                        "highlights": { "$meta": "searchHighlights" }
                      }

                   If you enabled :guilabel:`Auto Preview`, |compass| 
                   displays the following documents next to the 
                   :pipeline:`$project` pipeline stage:

            .. literalinclude:: /includes/fts/embedded-document/advanced-mongosh-query-results.json  
               :language: json
               :linenos: 

            .. include:: /includes/fts/extracts/fts-embedded-document-advanced-query-results.rst
