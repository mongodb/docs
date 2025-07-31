Try an Example for the |fts-field-type| Type  
--------------------------------------------

The following index definition examples use collections in the
:ref:`sample data <available-sample-datasets>`. After you 
:ref:`load the sample data <load-sample-data>`, you can use the 
Visual Editor or |json| Editor to configure
these indexes. After you select your preferred configuration method,
select the database and collection, and refine your index to add field
mappings.  

.. tabs:: 
  
   .. tab:: Basic Example
      :tabid: basic

      The following index definition for the 
      ``sample_mflix.movies`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``title`` field for autocomplete functionality. The 
      following example also: 
    
      - Uses the ``lucene.standard`` analyzer for text processing.
      - Configures ``edgeGram`` tokenization with 2-15 character grams.
      - Enables diacritic folding for better search results.

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: For a guided experience, select Visual Editor. 
         :expanded: false

         1. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`title` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Autocomplete`.
         #. Modify the :guilabel:`Autocomplete Properties` to set the
            following: 
             
            - :guilabel:`Analyzer` to ``lucene.standard``.
            - :guilabel:`Tokenization` to ``edgeGram``.
            - :guilabel:`Min Grams` to ``2``.
            - :guilabel:`Max Grams` to ``15``.
            - :guilabel:`Fold Diacritics` to ``true``.
          
         #. Click :guilabel:`Add`. 

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: To edit the raw index definition, select JSON Editor. 
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: true

            {
              "mappings": {
                "dynamic": false,
                "fields": {
                  "title": {
                    "type": "autocomplete",
                    "analyzer": "lucene.standard",
                    "tokenization": "edgeGram",
                    "minGrams": 2,
                    "maxGrams": 15,
                    "foldDiacritics": true
                  }
                }
              }
            }

   .. tab:: Multiple Types Example
      :tabid: multiplefields 

      The following index definition for the
      ``sample_mflix.movies`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes the 
      ``title`` field with both autocomplete and string field types
      to enable both autocomplete functionality and exact matching.

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: For a guided experience, select Visual Editor. 
         :expanded: false

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`title` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Autocomplete`.
         #. Modify the :guilabel:`Autocomplete Properties` to set the
            following: 

            - :guilabel:`Analyzer` to ``lucene.standard``.
            - :guilabel:`Tokenization` to ``edgeGram``.
            - :guilabel:`Min Grams` to ``2``.
            - :guilabel:`Max Grams` to ``15``.
            - :guilabel:`Fold Diacritics` to ``false``.
          
         #. Click :guilabel:`Add`.
         #. Add another field mapping for the same field with
            :guilabel:`Data Type` set to :guilabel:`String`.
         #. Click :guilabel:`Add`.

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: To edit the raw index definition, select JSON Editor. 
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: false

            {
              "mappings": {
                "dynamic": true,
                  "fields": {
                  "title": [
                    {
                      "type": "autocomplete",
                      "analyzer": "lucene.standard",
                      "tokenization": "edgeGram",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": false
                    },
                    {
                      "type": "string"
                    }
                  ]
                }
              }
            }

   .. tab:: Email Example
      :tabid: email

      The following index definition for the
      ``sample_mflix.users`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` uses
      a custom analyzer for autocomplete functionality on the
      ``email`` field to provide more specialized text processing.   

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: For a guided experience, select Visual Editor. 
         :expanded: false

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`email` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Autocomplete`.
         #. Modify the :guilabel:`Autocomplete Properties` to set the
            following: 

            - :guilabel:`Analyzer` to ``lucene.keyword``.
            - :guilabel:`Tokenization` to ``nGram``.
            - :guilabel:`Min Grams` to ``3``.
            - :guilabel:`Max Grams` to ``15``.
            - :guilabel:`Fold Diacritics` to ``false``.
          
         #. Click :guilabel:`Add`. 

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: To edit the raw index definition, select JSON Editor. 
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: false

            {
              "mappings": {
              "dynamic": true,
                "fields": {
                  "email": {
                    "type": "autocomplete",
                    "analyzer": "lucene.keyword",
                    "tokenization": "nGram",
                    "minGrams": 3,
                    "maxGrams": 15,
                    "foldDiacritics": false
                  }
                }
              }
            }
