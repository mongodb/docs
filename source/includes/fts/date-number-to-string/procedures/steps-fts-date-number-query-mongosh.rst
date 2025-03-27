.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      cluster. For detailed instructions on connecting, see 
      :doc:`/mongo-shell-connection`.

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
            :visible: true

            switched to db sample_airbnb

   .. step:: Run the following |fts| queries using the operator for which you created the index.

      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: json

                        db.airbnb_mat_view.aggregate([
                          {
                            "$search": { 
                              "index": "date-number-fields-tutorial",
                              "queryString": { 
                                "defaultPath": "propertyType",
                                "query": "propertyType: (Apartment OR Condominium) AND accommodatesNumber: 4 AND lastScrapedDate: 2019"
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

                     .. output:: /includes/fts/date-number-to-string/querystring-and-sh-compass-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: json

                        db.airbnb_mat_view.aggregate([
                          {
                            "$search": {
                              "index": "date-number-fields-tutorial",
                              "queryString": {
                                "defaultPath": "propertyType",
                                "query": "propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30"
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

                     .. output:: /includes/fts/date-number-to-string/querystring-or-sh-compass-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

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

                     .. output:: /includes/fts/date-number-to-string/autocomplete-date-sh-compass-query-results.json
                        :language: none
                        :emphasize-lines: 3, 7, 10, 14, 17, 21, 24, 28, 31, 35
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

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

                     .. output:: /includes/fts/date-number-to-string/autocomplete-numeric-sh-compass-query-results.json
                        :language: none
                        :emphasize-lines: 6-7, 13-14, 20-21, 27-28, 34-35
                        :visible: true
