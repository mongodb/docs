.. procedure::
   :style: normal

   .. step:: Click the :guilabel:`Aggregations` tab in the ``sample_mflix.movies`` collection.

   .. step:: Click :guilabel:`Add Stage` to add an aggregation pipeline stage.

   .. step:: Select :guilabel:`$search` from the dropdown.

   .. step:: Copy and paste one of the following queries into the stage editor.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            The following query searches for documents where the ``plot`` field
            contains words that begin with ``haw``.

            .. code-block:: json

               {
                 "autocomplete": {
                   "query": "haw",
                   "path": "plot"
                 }
               }

         .. tab:: phrase
            :tabid: phrase

            The following query searches for documents where the ``plot`` field
            contains the phrase ``new york`` with a maximum distance of 5 between terms.

            .. code-block:: json

               {
                 "phrase": {
                   "query": "new york",
                   "path": "plot",
                   "slop": 5
                 }
               }

         .. tab:: regex
            :tabid: regex

            The following query searches for documents where the ``plot`` field
            contains words that match the regular expression pattern.

            .. code-block:: json

               {
                 "regex": {
                   "query": "(?i)new.*york",
                   "path": "plot"
                 }
               }

         .. tab:: wildcard
            :tabid: wildcard

            The following query searches for documents where the ``plot`` field
            contains words that match the wildcard pattern.

            .. code-block:: json

               {
                 "wildcard": {
                   "query": "new*york",
                   "path": "plot"
                 }
               }

   .. step:: Click the green :guilabel:`Run` button to execute the aggregation.

      MongoDB Compass displays the search results in the pipeline results panel.
