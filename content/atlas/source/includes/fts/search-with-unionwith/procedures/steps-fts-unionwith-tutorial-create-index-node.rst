.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. code-block:: shell
         :copyable: true

         mkdir search-with-unionwith
         cd search-with-unionwith
         npm init -y
         npm install mongodb

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current/get-started/>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/fts/search-with-unionwith/create-index-example.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::
            :visible: false

            New index name for companies: default
            New index name for inspections: default
