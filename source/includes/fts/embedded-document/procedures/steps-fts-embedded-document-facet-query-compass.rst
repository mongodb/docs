.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed 
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``schools`` collection in the ``local_school_district`` database.

      On the :guilabel:`Database` screen, click the 
      ``local_school_district`` database, and then click the ``schools`` 
      collection.

   .. step:: Run the following |fts| queries against the ``schools`` collection.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst 

      .. list-table::
         :header-rows: 1
         :widths: 15 85

         * - Pipeline Stage
           - Query

         * - ``$searchMeta``
           - .. code-block:: javascript

               {
                 "index": "embedded-embedded-documents-tutorial",
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

             |compass| displays the following in the results: 

             .. literalinclude:: /includes/fts/embedded-document/facet-ui-query-results.sh 
                :language: shell
                :linenos:  

             .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
