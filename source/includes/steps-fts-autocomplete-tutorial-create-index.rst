.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Select an |fts| :guilabel:`Configuration Method` and click :guilabel:`Next`.
      
      - For a guided experience, select the |fts| :guilabel:`Visual Editor`.
      - To edit the raw index definition, select the |fts|
        :guilabel:`JSON Editor`.
      
   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
      
      a. In the :guilabel:`Index Name` field, enter ``autocomplete-tutorial``.
      
         .. include:: /includes/default-fts-index-name.rst 
      
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_mflix`` database, and select the ``movies`` collection.
      
   .. step:: Specify an index definition with the ``autocomplete`` field type.
      
      You can use the |fts| :guilabel:`Visual Editor` or the |fts|
      :guilabel:`JSON Editor` in the |service| user interface to create the 
      index.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Next`.
            #. Click :guilabel:`Refine Your Index`.
            #. Click :guilabel:`Add Field` in the :guilabel:`Field Mappings`
               section. 
            #. Configure the following field for autocompletion:
                  
               .. list-table:: 
                  :header-rows: 1
                  :widths: 20 80
       
                  * - UI Field Name 
                    - Configuration 
      
                  * - :guilabel:`Field Name`
                    - Enter ``title``.
      
                  * - :guilabel:`Data Type`
                    - Select ``Autocomplete``.
               
            #. Review the following default settings:
      
               .. list-table:: 
                  :header-rows: 1
                  :widths: 20 80
       
                  * - UI Field Name 
                    - Configuration
      
                  * - :guilabel:`Max Grams`
                    - ``15``
      
                  * - :guilabel:`Min Grams`
                    - ``2``
      
                  * - :guilabel:`Tokenization`
                    - :guilabel:`edgeGram`
      
                  * - :guilabel:`Fold Diacritics`
                    - :guilabel:`true`
      
            #. Click :guilabel:`Add`.
            #. Repeat steps **c** through **g** for the ``plot`` field.
            #. Click :guilabel:`Save Changes`. 
      
         .. tab:: JSON Editor
            :tabid: jsonib
      
            a. Replace the default definition with the following index
               definition. 
      
               .. code-block:: json
      
                  {
                    "mappings": {
                      "dynamic": false,
                      "fields": {
                        "title": {
                          "type": "autocomplete",
                          "tokenization": "edgeGram",
                          "foldDiacritics": true,
                          "minGrams": 2,
                          "maxGrams": 15
                        },
                        "plot": {
                          "type": "autocomplete",
                          "tokenization": "edgeGram",
                          "foldDiacritics": true,
                          "minGrams": 2,
                          "maxGrams": 15
                        }
                      }
                    }
                  }
      
            #. Click :guilabel:`Next`.
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Wait for the index to finish building.
      
      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads ``Build in
      Progress``. When it is finished building, the
      :guilabel:`Status` column reads ``Active``.
      