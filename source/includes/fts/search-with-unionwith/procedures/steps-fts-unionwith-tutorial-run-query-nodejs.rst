.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``search-with-unionwith-query.js``.

   .. step:: Copy and paste the sample query into the ``search-with-unionwith-query.js`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.js 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 44

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.js 
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 59

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Query your collection.

      Run the following command to query your collection: 
  
      .. tabs:: 
         :hidden:

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node unionwith-with-search-query.js
        
               .. output::
                  :language: js
                  :visible: true

                  {
                    name: 'SoftBank Mobile',
                    number_of_employees: null,
                    founded_year: null,
                    score: 2.0815043449401855,
                    source: 'companies'
                  }
                  {
                    name: 'Mobile Factory',
                    number_of_employees: 53,
                    founded_year: 2001,
                    score: 2.0815043449401855,
                    source: 'companies'
                  }
                  {
                    name: 'ZOOZ Mobile',
                    number_of_employees: 5,
                    founded_year: 2008,
                    score: 2.0815043449401855,
                    source: 'companies'
                  }
                  {
                    business_name: 'T. MOBILE',
                    address: { city: 'BROOKLYN', zip: 11209, street: '86TH ST', number: 440 },
                    source: 'inspections',
                    score: 2.900916337966919
                  }
                  {
                    business_name: 'BOOST MOBILE',
                    address: { city: 'BRONX', zip: 10458, street: 'E FORDHAM RD', number: 261 },
                    source: 'inspections',
                    score: 2.900916337966919
                  }
                  {
                    business_name: 'T-MOBILE',
                    address: { city: 'BROOKLYN', zip: 11229, street: 'AVENUE U', number: 1616 },
                    source: 'inspections',
                    score: 2.900916337966919
                  }

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
     
                  node unionwith-with-search-query.js
        
               .. output::
                  :language: js
                  :visible: true

                  {
                    allDocs: [
                      {
                        name: 'XLR8 Mobile',
                        number_of_employees: 21,
                        founded_year: 2006,
                        score: 3.33040714263916,
                        source: 'companies',
                        source_count: 52
                      },
                      {
                        name: 'Pulse Mobile',
                        number_of_employees: null,
                        founded_year: null,
                        score: 3.33040714263916,
                        source: 'companies',
                        source_count: 52
                      },
                      {
                        name: 'T-Mobile',
                        number_of_employees: null,
                        founded_year: null,
                        score: 3.33040714263916,
                        source: 'companies',
                        source_count: 52
                      },
                      {
                        business_name: 'T. MOBILE',
                        address: [Object],
                        score: 2.900916337966919,
                        source: 'inspections',
                        source_count: 456
                      },
                      {
                        business_name: 'BOOST MOBILE',
                        address: [Object],
                        score: 2.900916337966919,
                        source: 'inspections',
                        source_count: 456
                      },
                      {
                        business_name: 'SPRING MOBILE',
                        address: [Object],
                        score: 2.900916337966919,
                        source: 'inspections',
                        source_count: 456
                      }
                    ],
                    totalCount: [
                      { _id: 'companies', totalCount: 52 },
                      { _id: 'inspections', totalCount: 456 }
                    ]
                  }
