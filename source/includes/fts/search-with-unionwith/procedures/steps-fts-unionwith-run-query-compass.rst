.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``sample_training.companies`` collection.

      On the :guilabel:`Database` screen, click the ``sample_training``
      database and then click the ``companies`` collection.

   .. step:: Run the |fts| query against the collection.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      To run this query in |compass|: 

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages. 

         .. tabs:: 

            .. tab:: Basic Example 
               :tabid: basic

               .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

               .. include:: /includes/fts/search-with-unionwith/list-table-compass-basic-query.rst 
                 
               If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
               :guilabel:`Auto Preview`, |compass| displays the following
               documents next to the ``$project`` pipeline stage: 

               .. code-block:: json
                  :copyable: false 

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

               .. include:: /includes/fts/search-with-unionwith/list-table-compass-facet-query.rst 
                 
               If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
               :guilabel:`Auto Preview`, |compass| displays the following
               documents next to the ``$project`` pipeline stage: 

               .. code-block:: json
                  :copyable: false 

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

      |compass| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results.  
