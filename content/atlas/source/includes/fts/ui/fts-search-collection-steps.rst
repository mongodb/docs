.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: On the index you'd like to query, click the :guilabel:`Query` button on 
      the righthand side of the card.

      If you have no |fts| search indexes, click :guilabel::ref:`Create Search Index` to create a |fts| index. 
      To build a |fts| index that optimizes your |fts| query, see :ref:`fts-plan-index`. 

      The :guilabel:`Search Tester` displays. 

   .. step:: Run your query. 

      In the :guilabel:`Search Tester`, you can run a :pipeline:`$search` query
      using the :guilabel:`Search Tester` search bar, or enter the :guilabel:`Query Editor` modal
      to build and run a :pipeline:`$search` or :pipeline:`$searchMeta` stage in |json| format:

      .. tabs::

         .. tab:: Search Bar 
            :tabid: ui-fts-search-bar  

            a. Enter the term you want to search in the search box.

            b. Click :guilabel:`Search` to run a full-text wildcard query 
               using the :pipeline:`$search` stage with the :ref:`text <text-ref>` operator. 
      
         .. tab:: Query Editor
            :tabid: ui-query-editor

            a. Click :guilabel:`Edit Query` to view your query syntax in |json| format 
               in the :guilabel:`Query Editor` modal. 

            b. *(Optional)* Click :guilabel:`Create Query From Template` to view and copy 
               templates for popular |fts| query types. 

            c. Construct your query by modifying or replacing the displayed query.

            d. Click :guilabel:`Search` to run your query.

               :pipeline:`$search` queries return the top 10 result documents ranked by :ref:`score <scoring-ref>`. 

               :pipeline:`$searchMeta` queries return the resulting metadata document. 

            e. Click :guilabel:`Exit Query Editor` to exit the :guilabel:`Query Editor` modal. 

               .. important:: 

                  Copy your query before exiting the :guilabel:`Query Editor` modal. 
                  Once you click :guilabel:`Exit Query Editor`, the {+atlas-ui+}
                  discards your changes.


