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

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: Use the Visual Editor for an interactive experience.
         :expanded: false

         1. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`account_id` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Number`.
         #. Modify the :guilabel:`Number Properties` to set the
            following: 
             
            - :guilabel:`Representation` to ``int64``.
            - :guilabel:`Index Integers` to ``true``.
            - :guilabel:`Index Doubles` to ``true``.
          
         #. Click :guilabel:`Add`. 

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: true

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

   .. tab:: Index Integers Example
      :tabid: indexints 

      The following index definition for the
      ``sample_analytics.accounts`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes integer 
      values and omits doubles values in the the ``account_id``.

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: Use the Visual Editor for an interactive experience.
         :expanded: false

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`account_id` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Number`.
         #. Modify the :guilabel:`Number Properties` to set the
            following: 

            - :guilabel:`Representation` to ``int64``.
            - :guilabel:`Index Integers` to ``true``.
            - :guilabel:`Index Doubles` to ``false``.
         
         #. Click :guilabel:`Add`.

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: true
   
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

   .. tab:: Index Doubles Example
      :tabid: indexdoubles

      The following index definition for the
      ``sample_airbnb.listingsAndReviews`` collection in the  
      :ref:`sample dataset <available-sample-datasets>` indexes
      ``double`` type values and omits the 32-bit and 64-bit integer
      values in the ``bathrooms`` field.   

      .. collapsible::
         :heading: Visual Editor
         :sub_heading: Use the Visual Editor for an interactive experience.
         :expanded: false

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`bathrooms` from the :guilabel:`Field
            Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`Number`.
         #. Modify the :guilabel:`Number Properties` to set the
            following: 

            - :guilabel:`Representation` to ``doubles``.
            - :guilabel:`Index Integers` to ``false``.
            - :guilabel:`Index Doubles` to ``true``.
         
         #. Click :guilabel:`Add`. 

      .. collapsible::
         :heading: JSON Editor
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false

         Replace the default index definition with the following
         index definition. 

         .. code-block:: json
            :copyable: true

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