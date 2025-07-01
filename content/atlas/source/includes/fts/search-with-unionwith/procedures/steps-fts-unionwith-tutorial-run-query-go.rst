.. procedure::
   :style: normal 

   .. step:: Create a file named ``search-with-unionwith-query.go``

   .. step:: Copy and paste the query into the ``search-with-unionwith-query.go`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 18

         .. tab:: Facet Example 
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 18

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the command to query your collection.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example 
            :tabid: basic

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: shell
            
                  go run search-with-unionwith-query.go
      
               .. output:: 
                  :language: javascript

                  [{name XLR8 Mobile} {number_of_employees 21} {founded_year 2006} {score 3.33040714263916} {source companies} {source_count 52}]
                  [{name Pulse Mobile} {number_of_employees <nil>} {founded_year <nil>} {score 3.33040714263916} {source companies} {source_count 52}]
                  [{name T-Mobile} {number_of_employees <nil>} {founded_year <nil>} {score 3.33040714263916} {source companies} {source_count 52}]
                  [{business_name T. MOBILE} {address [{city BROOKLYN} {zip 11209} {street 86TH ST} {number 440}]} {score 2.900916337966919} {source inspections} {source_count 456}]
                  [{business_name BOOST MOBILE} {address [{city BRONX} {zip 10458} {street E FORDHAM RD} {number 261}]} {score 2.900916337966919} {source inspections} {source_count 456}]
                  [{business_name SPRING MOBILE} {address [{city SOUTH RICHMOND HILL} {zip 11419} {street LIBERTY AVE} {number 12207}]} {score 2.900916337966919} {source inspections} {source_count 456}]

         .. tab:: Facet Example 
            :tabid: facet

            .. io-code-block::
               :copyable: true
      
               .. input:: 
                  :language: shell
            
                  go run search-with-unionwith-query.go
      
               .. output:: 
                  :language: javascript

                  [
                    {allDocs [
                      [{name XLR8 Mobile} {number_of_employees 21} {founded_year 2006} {score 3.33040714263916} {source companies} {source_count 52}] 
                      [{name Pulse Mobile} {number_of_employees <nil>} {founded_year <nil>} {score 3.33040714263916} {source companies} {source_count 52}] 
                      [{name T-Mobile} {number_of_employees <nil>} {founded_year <nil>} {score 3.33040714263916} {source companies} {source_count 52}] 
                      [{business_name T. MOBILE} {address [{city BROOKLYN} {zip 11209} {street 86TH ST} {number 440}]} {score 2.900916337966919} {source inspections} {source_count 456}] 
                      [{business_name BOOST MOBILE} {address [{city BRONX} {zip 10458} {street E FORDHAM RD} {number 261}]} {score 2.900916337966919} {source inspections} {source_count 456}] 
                      [{business_name SPRING MOBILE} {address [{city SOUTH RICHMOND HILL} {zip 11419} {street LIBERTY AVE} {number 12207}]} {score 2.900916337966919} {source inspections} {source_count 456}]
                    ]} 
                    {totalCount [
                      [{_id inspections} {totalCount 456}] 
                      [{_id companies} {totalCount 52}]
                    ]}
                  ]
