.. procedure::
   :style: normal

   .. step:: Create a file named ``auto-embed-query.py``.

   .. step:: Copy and paste the {+avs+} query into the ``auto-embed-query.py`` file.

      .. tabs::

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            Perform a comprehensive search of the dataset for semantically similar
            terms to determine which query term returns the best results.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/python/multiple-vectors-query.py
               :copyable: true
               :language: python

            .. include:: /includes/unionwith/facts/auto-embed/multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            Search multiple fields in the dataset to determine which fields return
            the best results for the same query.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/python/same-term-vectors-query.py
               :copyable: true
               :language: python

            .. include:: /includes/unionwith/facts/auto-embed/same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            Search embeddings from different embedding models for the same query 
            term to determine the semantic interpretation differences between the 
            different models.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/python/same-term-multiple-models-query.py
               :copyable: true
               :language: python

            .. include:: /includes/unionwith/facts/auto-embed/same-term-multiple-models-query.rst

   .. step:: Specify your connection string.

      In the query file, replace the ``<connectionString>`` placeholder 
      with your connection string.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Run the command to query your collection.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  python auto-embed-query.py

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/python/multiple-vectors.js
                  :language: json
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  python auto-embed-query.py

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/python/same-term-vectors.js
                  :language: json
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  python auto-embed-query.py

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/python/same-term-multiple-models.js
                  :language: json
                  :visible: false
