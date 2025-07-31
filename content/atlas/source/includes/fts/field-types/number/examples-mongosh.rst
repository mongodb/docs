Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst 
  
.. tabs:: 
  
   .. tab:: Representation Example
      :tabid: representation

      The following index definition for the 
      ``sample_analytics.accounts`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``account_id`` field with 64-bit integer values. The 
      following example also: 
    
      - Indexes all other integer values in the ``account_id`` field.
      - Rounds any decimal values and indexes small double type 
        values in the ``account_id`` field.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            use sample_analytics
            db.accounts.createSearchIndex(
               "default",
               {
                 "mappings": { 
                   "dynamic": false,
                   "fields": {
                     "account_id": {
                       "type": "number",
                       "representation": "int64"
                     } 
                   }
                 }
               }
            )

         .. output::
            :visible: false

            default

   .. tab:: Index Integers Example
      :tabid: indexints 

      The following index definition for the
      ``sample_analytics.accounts`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes integer 
      values and omits doubles values in the the ``account_id``.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            use sample_analytics
            db.accounts.createSearchIndex(
               "default",
               {
                 "mappings": { 
                   "dynamic": false,
                   "fields": {
                     "account_id": {
                       "type": "number",
                       "representation": "int64",
                       "indexDoubles": false
                     } 
                   }
                 }
               }
            )

         .. output::
            :visible: false

            default

   .. tab:: Index Doubles Example
      :tabid: indexdoubles

      The following index definition for the
      ``sample_airbnb.listingsAndReviews`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes
      ``double`` type values and omits the 32-bit and 64-bit integer
      values in the ``bathrooms`` field.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            use sample_airbnb
            db.listingsAndReviews.createSearchIndex(
               "default",
               {
                 "mappings": { 
                   "dynamic": false,
                   "fields": {
                     "bathrooms": {
                       "type": "number",
                       "indexIntegers": false
                     } 
                   }
                 }
               }
            )

         .. output::
            :visible: false

            default