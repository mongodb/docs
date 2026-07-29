.. procedure::
   :style: normal

   .. step:: Add the MongoDB Node Driver as a dependency in your project:

      .. code-block:: sh

         npm install mongodb

      .. tip::

         The examples on this page assume your project manages modules as
         CommonJS modules. If you're using ES modules, instead, you must
         modify the import syntax.

   .. step:: Define the indexes.

      a. Create a file named ``create-index.js``.

      #. Copy and paste the following code into the ``create-index.js``
         file.

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/nodejs/create-index.js
            :language: javascript
            :copyable: true
            :caption: create-index.js
            :emphasize-lines: 5
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the indexes.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::
            :language: console

            New search index named multiple-auto-embed-search is building.
            New search index named multiple-models-search is building.
            Polling to check if the indexes are ready. This may take up to a minute.
            multiple-auto-embed-search is ready for querying.
            multiple-models-search is ready for querying.
