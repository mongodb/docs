.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/index/shared/code-snippets/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current/get-started/>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/cross-collection-tutorial/code-snippets/nodejs/create-index-example.js
         :caption: create-index.js
         :language: javascript
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

            New index name: lookup-with-search-tutorial
