.. procedure::
   :style: normal

   .. step:: Navigate to the |fts| page for your project.

      .. procedure::
         :style: connected

         .. step:: Select your organization.
         
            If it's not already displayed, select the organization that
            contains your project from the |ui-org-menu| in the
            navigation bar.

         .. step:: Select your project.
         
            If it's not already displayed, select your project
            from the :guilabel:`Projects` menu in the navigation bar.

         .. step:: Click your cluster's name.

         .. step:: Click the :guilabel:`Search` tab.


   .. step:: Click :guilabel:`Create Index`.

   .. step:: Select :guilabel:`JSON editor` for the :guilabel:`Configuration Method` and click :guilabel:`Next`.

   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
   
      .. procedure::
         :style: connected

         .. step:: In the :guilabel:`Index Name` field, enter ``default``.

            .. include:: /includes/default-fts-index-name.rst 

         .. step:: Select the ``sample_mflix.movies`` collection.
         
            In the :guilabel:`Database and Collection` section, find the 
            ``sample_mflix`` database, and select the ``movies`` collection.

   .. step:: Specify an index definition.
      
      Use the :guilabel:`Visual Editor` or the :guilabel:`JSON Editor` 
      in the |service| user interface to create an index definition that:

      - Indexes the ``released``, ``title``, and ``year`` fields as date, string, and number field types respectively.
      - Analyzes the title field using the ``lucene.keyword`` analyzer.
      - Stores the ``title`` field on ``mongot``.

      .. tabs::
      
         .. tab:: Visual Editor
            :tabid: visual-editor

            .. procedure::
               :style: connected

               .. step:: Click :guilabel:`Refine Your Index`.
             
               .. step:: Change :guilabel:`Dynamic Mapping` to :guilabel:`Off`.
             
               .. step:: Under :guilabel:`Field Mappings`, click :guilabel:`Add Field`.
             
               .. step:: Add the following fields in the :guilabel:`Field Mappings` section:
              
                  .. list-table:: 
                     :header-rows: 1
   
                     * - Field Name 
                       - Dynamic Mapping 
                       - Store Original Value
                       - Data Type Configuration 

                     * - ``title``
                       - Change :guilabel:`Enable Dynamic Mapping` to 
                         :guilabel:`Off`.
                       - Change :guilabel:`Store Original Value` to 
                         :guilabel:`On`.
                       - Click :guilabel:`Add Data Type`, and select 
                         :guilabel:`String`. Change the :guilabel:`Index Analyzer` to
                         ``lucene.keyword``.

                     * - ``year``
                       - Change :guilabel:`Enable Dynamic Mapping` to 
                         :guilabel:`Off`.
                       - Keep :guilabel:`Store Original Value` as
                         :guilabel:`Off`.
                       - Click :guilabel:`Add Data Type`, and select 
                         :guilabel:`Number`.

                     * - ``released``
                       - Change :guilabel:`Enable Dynamic Mapping` to 
                         :guilabel:`Off`.
                       - Keep :guilabel:`Store Original Value` as
                         :guilabel:`Off`.
                       - Click :guilabel:`Add Data Type`, and select 
                         :guilabel:`Date`.

               .. step:: Click :guilabel:`Save Changes`.

         .. tab:: JSON Editor
            :tabid: json-editor

            .. procedure::
               :style: connected

               .. step:: Replace the default definition with the following:

                  .. code-block:: json
                     :linenos:

                     {
                       "mappings": {
                         "dynamic": false,
                         "fields": {
                           "released": {
                             "type": "date"
                           },
                           "title": {
                             "analyzer": "lucene.keyword",
                             "searchAnalyzer": "lucene.keyword",
                             "type": "string"
                           },
                           "year": {
                             "type": "number"
                           }
                         }
                       },
                       "storedSource": {
                         "include": [
                           "title"
                         ]
                       }
                     }

               .. step:: Click :guilabel:`Next`.

   .. step:: Click :guilabel:`Create Search Index`.

        A modal window appears while your index is building.

   .. step:: Click :guilabel:`Close` to exit the modal.

   .. step:: Wait for the index to finish building.

      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads ``Build in
      Progress``. When it is finished building, the
      :guilabel:`Status` column reads ``Active``.
