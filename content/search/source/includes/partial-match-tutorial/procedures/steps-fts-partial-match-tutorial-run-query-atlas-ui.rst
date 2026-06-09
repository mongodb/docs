.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Click :guilabel:`Query` in your search index.

   .. step:: Click :guilabel:`Edit Query` to run the sample query.

   .. step:: Copy and paste the following query into the :guilabel:`Query` editor.

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

   .. step:: Click :guilabel:`Search` to run the query.

      |fts| returns the search results for documents in the ``movies`` collection.
