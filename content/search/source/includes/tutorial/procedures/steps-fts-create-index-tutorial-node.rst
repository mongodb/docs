.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. code-block::
      
         # Create a new directory and initialize the project
         mkdir atlas-search-quickstart && cd atlas-search-quickstart
         npm init -y

      .. code-block:: 

         # Add the MongoDB Node.js Driver to your project
         npm install mongodb

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the index.

      Paste the following code into a file named ``create-index.js``.
      
      .. literalinclude:: /includes/tutorial/code-snippets/javascript/create-index-tutorial.js
         :caption: create-index.js
         :language: javascript
         :emphasize-lines: 5
         :copyable:
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            default
