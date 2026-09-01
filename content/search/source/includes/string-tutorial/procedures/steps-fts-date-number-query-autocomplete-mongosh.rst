.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your
      cluster. For detailed instructions on connecting, see
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_airbnb`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            use sample_airbnb

         .. output::
            :language: sh
            :emphasize-lines: 1
            :visible: false

            switched to db sample_airbnb

   .. step:: Run the following |fts| queries using the operator for which you created the index.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. tabs::

         .. tab:: Year Search
            :tabid: yearquery

            .. include:: /includes/string-tutorial/facts/fts-date-query-desc.rst

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: json

                  db.airbnb_mat_view.aggregate([
                    {
                      "$search": {
                        "index": "date-number-fields-tutorial",
                        "compound": {
                          "should": [{
                            "autocomplete": {
                              "path": "lastScrapedDate",
                              "query": "2"
                            }
                          },
                          {
                            "autocomplete": {
                              "path": "maximumNumberOfNights",
                              "query": "1"
                            }
                          }]
                        }
                      }
                    },
                    { $limit: 5 },
                    {
                      $project: {
                        "_id": 0
                      }
                    }
                  ])

               .. output:: /includes/string-tutorial/code-snippets/shell/autocomplete-date-sh-compass-query-results.json
                  :language: none
                  :emphasize-lines: 3, 7, 10, 14, 17, 21, 24, 28, 31, 35
                  :visible: false

         .. tab:: Number Search
            :tabid: numericquery

            .. include:: /includes/string-tutorial/facts/fts-numeric-query-desc.rst

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: json

                  db.airbnb_mat_view.aggregate([
                    {
                      "$search": {
                        "index": "date-number-fields-tutorial",
                        "compound": {
                          "should": [{
                            "autocomplete": {
                              "path": "maximumNumberOfNights",
                              "query": "3"
                            }
                          },
                          {
                            "autocomplete": {
                              "path": "accommodatesNumber",
                              "query": "2"
                            }
                          }]
                        }
                      }
                    },
                    { $limit: 5 },
                    {
                      $project: {
                        "_id": 0
                      }
                    }
                  ])

               .. output:: /includes/string-tutorial/code-snippets/shell/autocomplete-numeric-sh-compass-query-results.json
                  :language: none
                  :emphasize-lines: 6-7, 13-14, 20-21, 27-28, 34-35
                  :visible: false
