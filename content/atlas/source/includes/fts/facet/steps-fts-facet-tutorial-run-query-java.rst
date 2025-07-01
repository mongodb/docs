.. procedure:: 
   :style: normal

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

   .. step:: Set up the file to run |fts| facet query.
  
      a. Create a file named ``FacetQuery.java``.
      #. Copy and paste the following code into the ``FacetQuery.java`` file.

         The code example performs the following tasks:

         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your |service| cluster.
         - Uses the following searchMeta clauses to query the collection: 

           .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         - Iterates over the cursor to print the documents that match the query.

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. literalinclude:: /includes/fts/facet/tutorial.java
                  :language: java
                  :linenos:
                  :dedent:
                  :emphasize-lines: 14

            .. tab:: $search with $$SEARCH_META
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.java
                  :language: java
                  :linenos:
                  :dedent:
                  :emphasize-lines: 14

         .. note:: 

            To run the sample code in your Maven environment, add the 
            following above the import statements in your file.

            .. code-block:: 

            package com.mongodb.drivers;

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run ``FacetQuery.java`` file.

     .. io-code-block::
        :copyable: true

        .. input::
           :language: bash

           javac FacetQuery.java
           java FacetQuery
        
        .. output::
           :language: json
           :visible: true
           
           {meta: {
             count: { lowerBound: Long('20878') },
             facet: {
               genresFacet: {
                 buckets: [
                  { _id: 'Drama', count: Long('12149') },
                  { _id: 'Comedy', count: Long('6436') },
                  { _id: 'Romance', count: Long('3274') },
                  { _id: 'Crime', count: Long('2429') },
                  { _id: 'Thriller', count: Long('2400') },
                  { _id: 'Action', count: Long('2349') },
                  { _id: 'Adventure', count: Long('1876') },
                  { _id: 'Documentary', count: Long('1755') },
                  { _id: 'Horror', count: Long('1432') },
                  { _id: 'Biography', count: Long('1244') }
                 ]
               },
               yearFacet: {
                 buckets: [
                  { _id: 1910, count: Long('14') },
                  { _id: 1920, count: Long('47') },
                  { _id: 1930, count: Long('238') }
                 ]
               }
             }
           }}

...