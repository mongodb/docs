.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify an index definition.
      
      This index definition for the ``genres`` and ``title`` fields
      specifies a custom analyzer, ``diacriticFolder``, using the following: 
      
      - :ref:`keyword-tokenizer-ref` tokenizer that tokenizes the entire
        input as a single token.
      - :ref:`icufolding-tf-ref` token filter that applies character
        foldings such as accent removal and case folding.
      
      The index definition specifies a string type for the ``genres``
      and ``title`` fields. It also applies the custom analyzer named
      ``diacriticFolder`` on the ``title`` field.
      
      .. tabs:: 
      
         .. tab:: Visual Editor 
            :tabid: vib
      
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Custom Analyzers` section, click
               :guilabel:`Add Custom Analyzer`.
            #. Select the :guilabel:`Create Your Own` radio button and click
               :guilabel:`Next`. 
            #. Type ``diacriticFolder`` in the :guilabel:`Analyzer Name`
               field.
            #. Expand :guilabel:`Tokenizer` if it's collapsed and select
               ``keyword`` from the dropdown.
            #. Expand :guilabel:`Token Filters` and click
               :icon-fa5:`plus-circle` :guilabel:`Add token filter`.
            #. Select ``icuFolding`` from the dropdown and click
               :guilabel:`Add token filter` to add the token filter to your
               custom analyzer.
            #. Click :guilabel:`Add` to add the custom analyzer to your
               index.
            #. In the :guilabel:`Field Mappings` section, click
               :guilabel:`Add Field Mapping` to apply the custom analyzer on the
               ``title`` field in the :guilabel:`Customized Configuration` tab. 
            #. Select ``title`` from the :guilabel:`Field Name` dropdown and
               **String** from the :guilabel:`Data Type` dropdown.
            #. In the properties section for the data type, select
               ``diacriticFolder`` from the :guilabel:`Index Analyzer` and
               :guilabel:`Search Analyzer` dropdowns. 
            #. Click :guilabel:`Add`.
            #. Click :guilabel:`Add Field Mapping` again to index the
               ``genres`` field.
            #. Select ``genres`` from the :guilabel:`Field Name` dropdown and
               **String** from the :guilabel:`Data Type` dropdown.
            #. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
      
         .. tab:: JSON Editor 
            :tabid: jsonib
      
            a. Replace the default definition with the following:
      
            .. code-block:: json
               :linenos:
         
               {
                 "mappings": {
                   "fields": {
                     "genres": {
                       "type": "string"
                     },
                     "title": {
                       "analyzer": "diacriticFolder",
                       "type": "string"
                     }
                   }
                 },
                 "analyzers": [{
                   "charFilters": [],
                   "name": "diacriticFolder",
                   "tokenizer": {
                     "type": "keyword"
                   },
                   "tokenFilters": [{
                     "type": "icuFolding"
                   }]
                 }]
               }
      
            b. Click :guilabel:`Next`.
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Wait for the index to finish building.
      
      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads ``Build in
      Progress``. When it is finished building, the
      :guilabel:`Status` column reads ``Active``.
      