.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Navigate to the collection.

      a. For the cluster that contains the sample data,
         click :guilabel:`Browse Collections`.
      #. In the left navigation pane, select the
         :guilabel:`sample_airbnb` database.
      #. Select the :guilabel:`listingsAndReviews` collection.

   .. step:: Click the :guilabel:`Aggregation` tab.

   .. step:: Add the :pipeline:`$search` stage with the operator for which you created the index.

      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      a. Click :guilabel:`Add Stage`.
      #. Select the :pipeline:`$search` stage from the :guilabel:`Select` drop-down menu.
      #. Add the following syntax to the aggregation pipeline editor,
         depending on the operator for which you created the index and
         the type of query you wish to run:

         .. tabs:: 

            .. tab:: queryString Operator 
               :tabid: querystring

               .. tabs:: 

                  .. tab:: AND Query 
                     :tabid: and-query 

                     .. include:: /includes/fts/extracts/fts-and-query-desc.rst
                     
                     .. code-block:: json
                        :copyable: true

                        {
                          "index": "date-number-fields-tutorial",
                          "queryString": {
                            "defaultPath": "propertyType",
                            "query": "propertyType: (Apartment OR Condominium) AND accommodatesNumber: 4 AND lastScrapedDate: 2019"
                          }
                        }

                  .. tab:: OR Query 
                     :tabid: or-query 

                     .. include:: /includes/fts/extracts/fts-or-query-desc.rst
                     
                     .. code-block:: json
                        :copyable: true 

                        {
                          "index": "date-number-fields-tutorial",
                          "queryString": {
                            "defaultPath": "propertyType",
                            "query": "propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30"
                          }
                        }


            .. tab:: autocomplete Operator 
               :tabid: autocomplete

               .. tabs:: 

                  .. tab:: Year Search
                     :tabid: yearquery

                     .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                     .. code-block:: json
                        :copyable: true 

                        {
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

                  .. tab:: Number Search
                     :tabid: numericquery

                     .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                     .. code-block:: json
                        :copyable: true 

                        {
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

   .. step:: Add the :pipeline:`$limit` stage.

      a. Click :guilabel:`Add Stage`.
      #. Select the :pipeline:`$limit` stage from the :guilabel:`Select` drop-down menu.
      #. Add the following syntax to the aggregation pipeline editor:

         .. code-block:: json
            :copyable: true

            5

   .. step:: Add the :pipeline:`$project` stage.

      a. Click :guilabel:`Add Stage`.
      #. Select the :pipeline:`$project` stage from the :guilabel:`Select` drop-down menu.
      #. Add the following syntax to the aggregation pipeline editor:

         .. code-block:: json
            :copyable: true

            {
              "_id": 0
            }

      #. View the results.

      The {+atlas-ui+} document view displays a sample of the results of
      your aggregation pipeline.