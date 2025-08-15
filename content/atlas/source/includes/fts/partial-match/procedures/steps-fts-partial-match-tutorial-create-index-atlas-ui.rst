.. procedure::
   :style: normal

   .. step:: Navigate to the |fts| page for your project.

      a. If it is not already displayed, select the organization that 
         contains your desired project from the :guilabel:`Organizations` 
         menu in the navigation bar.

      #. If it is not already displayed, select your desired project from the
         :guilabel:`Projects` menu in the navigation bar.

      #. Click your cluster name.

      #. Click the :guilabel:`Search` tab.

   .. step:: Click :guilabel:`Create Index`.

   .. step:: Select :guilabel:`JSON Editor` and click :guilabel:`Next`.

   .. step:: In the :guilabel:`Index Name` field, enter |index-name|.

   .. step:: In the :guilabel:`Database and Collection` section, find the |database-name| database, and select the |collection-name| collection.

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

   .. step:: Click :guilabel:`Next`.

   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Close the :guilabel:`You're All Set!` Modal Window.

      A modal window appears to let you know your index is building. Click 
      :guilabel:`Close`.

   .. step:: Wait for the index to finish building.

      The index should take about one minute to build. While it is building, the 
      :guilabel:`Status` column reads :guilabel:`Build in Progress`. When it is 
      finished building, the :guilabel:`Status` column reads :guilabel:`Active`.
