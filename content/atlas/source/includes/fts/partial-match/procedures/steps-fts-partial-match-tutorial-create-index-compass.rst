.. procedure::
   :style: normal

   .. step:: Connect to your cluster in MongoDB Compass.

   .. step:: Navigate to the ``sample_mflix.movies`` collection.

   .. step:: Click the :guilabel:`Search Indexes` tab.

   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Select :guilabel:`JSON Editor` configuration method.

   .. step:: Enter |index-name| as the index name.

   .. step:: Replace the default definition with the following index definition.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            The following index definition creates an autocomplete index on the ``plot`` field.

            .. code-block:: json

               {
                 "mappings": {
                   "fields": {
                     "plot": {
                       "type": "autocomplete"
                     }
                   }
                 }
               }

         .. tab:: string
            :tabid: string

            The following index definition creates a string index on the ``plot`` field.

            .. code-block:: json

               {
                 "mappings": {
                   "fields": {
                     "plot": {
                       "type": "string"
                     }
                   }
                 }
               }


   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Wait for the index to finish building.

      The index should take about one minute to build. While it is building, the 
      :guilabel:`Status` column reads :guilabel:`In Progress`. When it is 
      finished building, the :guilabel:`Status` column reads :guilabel:`Ready`.
