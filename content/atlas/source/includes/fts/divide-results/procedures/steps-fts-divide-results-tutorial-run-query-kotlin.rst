.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create a file named ``DivideQueryResults.kt``.

   .. step:: Copy and paste the query into the ``DivideQueryResults.kt`` file.

      .. tabs:: 

         .. tab:: Paginate Results 
            :tabid: basic

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/simple-query.kt
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 9

         .. tab:: Return Total and Paginate Results
            :tabid: facet

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst 

            .. literalinclude:: /includes/fts/divide-results/facet-query.kt 
               :language: kotlin
               :linenos:
               :dedent:
               :emphasize-lines: 7

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the ``DivideQueryResults.kt`` file.

      .. tabs:: 
         :hidden:

         .. tab:: Basic Example
            :tabid: basic

            When you run the ``DivideQueryResults.kt`` program in your IDE, it prints
            the following documents:
            
            .. code-block:: none
               :copyable: false
               
               Document{{cast=[Tom Hanks, Bruce Dern, Carrie Fisher, Rick Ducommun], title=The 'Burbs}}
               Document{{title=Sleepless in Seattle, cast=[Tom Hanks, Ross Malinger, Rita Wilson, Victor Garber]}}
               Document{{cast=[Tom Hanks, Tim Allen, Kristen Schaal, Kevin McKidd], title=Toy Story That Time Forgot}}
               Document{{title=Catch Me If You Can, cast=[Leonardo DiCaprio, Tom Hanks, Christopher Walken, Martin Sheen]}}
               Document{{title=The Polar Express, cast=[Tom Hanks, Leslie Zemeckis, Eddie Deezen, Nona Gaye]}}
               Document{{cast=[Tom Hanks, Audrey Tautou, Ian McKellen, Jean Reno], title=The Da Vinci Code}}
               Document{{cast=[Keith David, Katharine Phillips, Tom Hanks, Paul Fussell], title=The War}}
               Document{{cast=[Tom Hanks, Bruce Willis, Melanie Griffith, Kim Cattrall], title=The Bonfire of the Vanities}}
               Document{{cast=[Tom Hanks, Denzel Washington, Roberta Maxwell, Buzz Kilman], title=Philadelphia}}
               Document{{title=Apollo 13, cast=[Tom Hanks, Bill Paxton, Kevin Bacon, Gary Sinise]}}

         .. tab:: Facet Example
            :tabid: facet

            When you run the ``DivideQueryResults.kt`` program in your IDE, it prints
            the following result:
            
            .. code-block:: none
               :copyable: false
               
               Document{{rows=[Document{{cast=[Tom Hanks, Bruce Dern, Carrie Fisher,
               Rick Ducommun], title=The 'Burbs, score=4.617640972137451}},
               Document{{title=Sleepless in Seattle, cast=[Tom Hanks, Ross Malinger,
               Rita Wilson, Victor Garber], score=4.617640972137451}},
               Document{{cast=[Tom Hanks, Tim Allen, Kristen Schaal, Kevin McKidd],
               title=Toy Story That Time Forgot, score=4.617640972137451}},
               Document{{title=Catch Me If You Can, cast=[Leonardo DiCaprio, Tom Hanks,
               Christopher Walken, Martin Sheen], score=4.617640972137451}},
               Document{{title=The Polar Express, cast=[Tom Hanks, Leslie Zemeckis,
               Eddie Deezen, Nona Gaye], score=4.617640972137451}}, Document{{cast=[Tom
               Hanks, Audrey Tautou, Ian McKellen, Jean Reno], title=The Da Vinci Code,
               score=4.617640972137451}}, Document{{cast=[Keith David, Katharine
               Phillips, Tom Hanks, Paul Fussell], title=The War,
               score=4.617640972137451}}, Document{{cast=[Tom Hanks, Bruce Willis,
               Melanie Griffith, Kim Cattrall], title=The Bonfire of the Vanities,
               score=4.617640972137451}}, Document{{cast=[Tom Hanks, Denzel Washington,
               Roberta Maxwell, Buzz Kilman], title=Philadelphia,
               score=4.617640972137451}}, Document{{title=Apollo 13, cast=[Tom Hanks,
               Bill Paxton, Kevin Bacon, Gary Sinise], score=4.617640972137451}}],
               totalRows=Document{{count=Document{{lowerBound=435}}}}}}
