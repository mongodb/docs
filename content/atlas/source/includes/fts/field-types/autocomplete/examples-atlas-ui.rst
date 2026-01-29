Try an Example for the |fts-field-type| Type  
--------------------------------------------

The following index definition examples use collections in the
:ref:`sample data <available-sample-datasets>`. After you 
:ref:`load the sample data <load-sample-data>`, you can use the 
Visual Editor or |json| Editor to configure these indexes. After you
select your preferred configuration method, select the database and
collection, and refine your index to add field mappings.  

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field using static mappings as autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/basic-example-description.rst

   .. tabs:: 
   
      .. tab:: Visual Editor
         :tabid: vib

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
            - :guilabel:`Similarity.type` to ``stableTfl``.
          
         #. Click :guilabel:`Add`. 

      .. tab:: JSON Editor
         :tabid: jib

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
                     "foldDiacritics": true,
                     "similarity": { "type": "stableTfl" }
                  }
                }
              }
            }

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Dynamically index string fields as the autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/cdi-example-description.rst

   .. tabs:: 
   
      .. tab:: Visual Editor
         :tabid: vib

         You can't configure ``typeSets`` using the {+atlas-ui+}
         :guilabel:`Visual Editor`. 

      .. tab:: JSON Editor
         :tabid: jib

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: true

            {
              "mappings": {
                "dynamic": {
                  "typeSet": "moviesStringIndex"
                },
                "fields": {
                  "poster": [],
                  "languages": [],
                  "rated": [],
                  "lastupdated": [],
                  "fullplot": [],
                  "awards": []
                }
              },
              "typeSets": [
                {
                  "name": "moviesStringIndex",
                  "types": [
                    {
                      "type": "autocomplete"
                    }
                  ]
                }
              ]
            }

   .. note:: 

      Indexing all string fields as the autocomplete type can take some
      time and resources. Also, this might cause your index size to grow.

.. collapsible::
   :heading: Multiple Types Example
   :sub_heading: Index specific field as autocomplete and string types.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/multiple-field-example-description.rst 

   .. tabs:: 
   
      .. tab:: Visual Editor
         :tabid: vib

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

      .. tab:: JSON Editor
         :tabid: jib

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: false

            {
              "mappings": {
                "dynamic": true,
                "fields": {
                  "title": [{
                    "type": "autocomplete",
                    "analyzer": "lucene.standard",
                    "tokenization": "edgeGram",
                    "minGrams": 2,
                    "maxGrams": 15,
                    "foldDiacritics": false
                  },
                  {
                    "type": "string"
                  }]
                }
              }
            }

.. collapsible::
   :heading: Email Example
   :sub_heading: Index email address as the autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/email-example-description.rst 

   .. tabs:: 
   
      .. tab:: Visual Editor
         :tabid: vib

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

      .. tab:: JSON Editor
         :tabid: jib

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
