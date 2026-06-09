.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      cluster. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_mflix`` database. 

      Run the following command at the {+mongosh+} prompt:

      .. code-block:: javascript
         
         use sample_mflix

   .. step:: Run one of the following |fts| queries against the ``movies`` collection.

      .. tabs:: 

         .. tab:: autocomplete
            :tabid: autocomplete

            The following query searches for documents where the ``plot`` field
            contains words that begin with ``haw``.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/nodejs/queryAutocompleteMongosh.js
               :language: javascript

         .. tab:: phrase
            :tabid: phrase

            The following query searches for documents where the ``plot`` field
            contains the phrase ``new york`` with a maximum distance of 5 between terms.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/nodejs/queryPhraseMongosh.js
               :language: javascript

         .. tab:: regex
            :tabid: regex

            The following query searches for documents where the ``plot`` field
            contains words that match the regular expression pattern.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/nodejs/queryRegexMongosh.js
               :language: javascript

         .. tab:: wildcard
            :tabid: wildcard

            The following query searches for documents where the ``plot`` field
            contains words that match the wildcard pattern.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/nodejs/queryWildcardMongosh.js
               :language: javascript
