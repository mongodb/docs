.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``SearchWithUnionwithQuery.kt``.

   .. step:: Copy and paste the query into the ``SearchWithUnionwithQuery.kt`` file.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/basic-query.kt
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 7

         .. tab:: Facet Example
            :tabid: facet

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. literalinclude:: /includes/fts/search-with-unionwith/facet-query.kt
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 8

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the ``SearchWithUnionwithQuery.kt`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example
            :tabid: basic

            Compile and run your application in your IDE or your shell. 

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  kotlinc SearchWithUnionwithQuery.kt -include-runtime -d SearchWithUnionwithQuery.jar
                  java -jar SearchWithUnionwithQuery.jar

               .. output::
                  :visible: false

                  Document{{name=XLR8 Mobile, number_of_employees=21, founded_year=2006, score=2.0815043449401855, source=companies}}
                  Document{{name=Pulse Mobile, number_of_employees=null, founded_year=null, score=2.0815043449401855, source=companies}}
                  Document{{name=Mobile Trend, number_of_employees=null, founded_year=2003, score=2.0815043449401855, source=companies}}
                  Document{{business_name=T-MOBILE, address=Document{{city=BROOKLYN, zip=11229, street=AVENUE U, number=1616}}, source=inspections, score=2.900916337966919}}
                  Document{{business_name=BOOST MOBILE, address=Document{{city=BRONX, zip=10458, street=E FORDHAM RD, number=261}}, source=inspections, score=2.900916337966919}}
                  Document{{business_name=SPRING MOBILE, address=Document{{city=SOUTH RICHMOND HILL, zip=11419, street=LIBERTY AVE, number=12207}}, source=inspections, score=2.900916337966919}}

         .. tab:: Facet Example
            :tabid: facet

            Compile and run your application in your IDE or your shell. 

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  kotlinc SearchWithUnionwithQuery.kt -include-runtime -d SearchWithUnionwithQuery.jar
                  java -jar SearchWithUnionwithQuery.jar

               .. output::
                  :visible: false

                  Document{{allDocs=[Document{{name=XLR8 Mobile,
                  number_of_employees=21, founded_year=2006,
                  score=3.33040714263916, source=companies,
                  source_count=52}}, Document{{name=Pulse Mobile,
                  number_of_employees=null, founded_year=null,
                  score=3.33040714263916, source=companies,
                  source_count=52}}, Document{{name=Mobile Trend,
                  number_of_employees=null, founded_year=2003,
                  score=3.33040714263916, source=companies,
                  source_count=52}}, Document{{business_name=T-MOBILE,
                  address=Document{{city=BROOKLYN, zip=11229, street=AVENUE
                  U, number=1616}}, score=2.900916337966919,
                  source=inspections, source_count=456}},
                  Document{{business_name=BOOST MOBILE,
                  address=Document{{city=BRONX, zip=10458, street=E FORDHAM
                  RD, number=261}}, score=2.900916337966919,
                  source=inspections, source_count=456}},
                  Document{{business_name=SPRING MOBILE,
                  address=Document{{city=SOUTH RICHMOND HILL, zip=11419,
                  street=LIBERTY AVE, number=12207}},
                  score=2.900916337966919, source=inspections,
                  source_count=456}}],
                  totalCount=[Document{{_id=inspections, totalCount=456}},
                  Document{{_id=companies, totalCount=52}}]}}