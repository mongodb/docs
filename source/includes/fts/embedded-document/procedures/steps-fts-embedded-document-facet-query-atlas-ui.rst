.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Go to the :guilabel:`Search Tester` page.

      Click the :guilabel:`Query` button to the right of the index to
      query. 

   .. step:: View and edit the query syntax.

      Click :guilabel:`Edit Query` to view a default query
      syntax sample in |json| format.
      
   .. step:: Run an |fts| query with the ``embeddedDocument`` operator on the ``schools`` collection.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst
      
      Copy and paste the following query into the :guilabel:`Query
      Editor`, and then click the :guilabel:`Search` button in the
      :guilabel:`Query Editor`.
      
      .. io-code-block::
         :copyable: true
      
         .. input:: 
            :language: json
            :linenos: 

            [
              {
                "$searchMeta": {
                  "index": "embedded-documents-tutorial",
                  "facet": {
                    "operator": {
                      "text":{
                        "path": "name",
                        "query": "High"
                      }
                    },
                    "facets": {
                      "gradeFacet": {
                        "type": "string",
                        "path": "teachers.classes.grade"
                      }
                    }
                  }
                }
              }
            ]
      
         .. output:: /includes/fts/embedded-document/facet-ui-query-results.sh
            :language: js 
         