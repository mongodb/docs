.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Go to the :guilabel:`Browse Collections` page.
      
      Click the :guilabel:`Browse Collections` button for your
      {+cluster+}. 
      
   .. step:: Go to the :guilabel:`Aggregation` page for your cluster.

      a. Expand the :guilabel:`sample_training` database and click the
         :guilabel:`companies` collection.
      #. Click the :guilabel:`Aggregation` tab for the
         collection.

   .. step:: Run a |fts| ``$unionWith`` query on the ``companies`` and ``inspections`` collections.
      
      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst
      
      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst
            
            Click the :guilabel:`TEXT` view on the :guilabel:`Aggregation` page.
            Then, copy and paste the following code into the pipeline
            to run the query:
            
            .. io-code-block::
               :copyable: true
            
               .. input::
                  :language: js
                  :linenos:
               
                  [
                    {
                      $search: {
                        text: { 
                          query: "Mobile", 
                          path: "name" 
                        }
                      }
                    }, {
                      $project: {
                        score: { $meta: "searchScore" }, 
                        _id: 0, 
                        number_of_employees: 1, 
                        founded_year: 1, 
                        name: 1
                      }
                    }, {
                      $set: { 
                        source: "companies" 
                      }
                    }, {
                      $limit: 3
                    }, {
                      $unionWith: {
                        coll: "inspections", 
                        pipeline: [
                          {
                            $search: {
                              text: { 
                                query: "Mobile", 
                                path: "business_name" 
                              }
                            }
                          }, {
                            $set: { 
                              source: "inspections" 
                            }
                          }, {
                            $project: {
                              score: { $meta: "searchScore" }, 
                              source: 1, 
                              _id: 0, 
                              business_name: 1, 
                              address: 1
                            }
                          }, {
                            $limit: 3
                          }, {
                            $sort: { 
                              score: -1 
                            }
                          }
                        ]
                      }
                    }
                  ]
            
               .. output::
                  :visible: true

                  name: "XLR8 Mobile"
                  number_of_employees: 21
                  founded_year: 2006
                  score: 2.0815043449401855
                  source: "companies"
            
                  name: "Pulse Mobile"
                  number_of_employees: null
                  founded_year: null
                  score: 2.0815043449401855
                  source: "companies"

                  name: "T-Mobile"
                  number_of_employees: null
                  founded_year: null
                  score: 2.0815043449401855
                  source: "companies"

                  business_name: "T. MOBILE"
                  address: Object
                  source: "inspections"
                  score: 2.900916337966919

                  business_name: "BOOST MOBILE"
                  address: Object
                  source: "inspections"
                  score: 2.900916337966919

                  business_name: "SPRING MOBILE"
                  address: Object
                  source: "inspections"
                  score: 2.900916337966919

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst
            
            Click the :guilabel:`TEXT` view on the :guilabel:`Aggregation` page.
            Then, copy and paste the following code into the pipeline
            to run the query:
            
            .. io-code-block::
               :copyable: true
            
               .. input::
                  :language: js
                  :linenos:
               
                  [
                    {
                      $search: { 
                        text: {
                          query: "mobile", 
                          path: "name", 
                          score: { 
                            boost: { 
                              value: 1.6 
                            }  
                          }
                        }
                      }
                    }, 
                    {
                      $project: {
                        score: { $meta: "searchScore" }, 
                        _id: 0, 
                        number_of_employees: 1, 
                        founded_year: 1, 
                        name: 1
                      }
                    }, 
                    {
                      $set: {
                        source: "companies", 
                        source_count: "$$SEARCH_META.count.lowerBound"
                      }
                    }, 
                    {
                      $limit: 3
                    }, 
                    {
                      $unionWith: {
                        coll: "inspections", 
                        pipeline: [
                          {
                            $search: { 
                              text: {
                                query: "mobile", 
                                path: "business_name"
                              }
                            } 
                          }, 
                          {
                            $project: {
                              score: { $meta: "searchScore" }, 
                              business_name: 1, 
                              address: 1, 
                              _id: 0
                            }
                          }, 
                          {
                            $limit: 3
                          }, 
                          {
                            $set: {
                              source: "inspections", 
                              source_count: "$$SEARCH_META.count.lowerBound"
                            }
                          }, 
                          {
                            $sort: { score: -1 }
                          }
                        ]
                      }
                    }, 
                    {
                      $facet: {
                        allDocs: [], 
                        totalCount: [
                          {
                            $group: {
                              _id: "$source", 
                              firstCount: { $first: "$source_count" }
                            }
                          }, 
                          {
                            $project: {
                              totalCount: { $sum: "$firstCount" }
                            }
                          }
                        ]
                      }
                    }
                  ]
            
               .. output::
                  :visible: true
      
                  allDocs: Array (6)
                    0: Object
                      name: "XLR8 Mobile"
                      number_of_employees: 21
                      founded_year: 2006
                      score: 3.33040714263916
                      source: "companies"
                      source_count: 52

                    1: Object
                      name: "Pulse Mobile"
                      number_of_employees: null
                      founded_year: null
                      score: 3.33040714263916
                      source: "companies"
                      source_count: 52

                    2: Object
                      name: "T-Mobile"
                      number_of_employees: null
                      founded_year: null
                      score: 3.33040714263916
                      source: "companies"
                      source_count: 52

                    3: Object
                      business_name: "T. MOBILE"
                      address: Object
                      score: 2.900916337966919
                      source: "inspections"
                      source_count: 456

                    4: Object
                      business_name: "BOOST MOBILE"
                      address: Object
                      score: 2.900916337966919
                      source: "inspections"
                      source_count: 456

                    5: Object
                      business_name: "SPRING MOBILE"
                      address: Object
                      score: 2.900916337966919
                      source: "inspections"
                      source_count: 456

                  totalCount: Array (2)
                    0: Object
                      _id: "companies"
                      totalCount: 52

                    1: Object
                      _id: "inspections"
                      totalCount: 456

   .. step:: Expand your query results.

      |service| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results.
