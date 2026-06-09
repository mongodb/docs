.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/index/shared/code-snippets/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the materialized view.

      Create a new file in your project directory named
      ``create-materialized-view.js``, and copy and paste the following
      code into the file. 
      
      .. include:: /includes/string-tutorial/facts/fact-data-transformation.rst

      .. literalinclude:: /includes/string-tutorial/code-snippets/nodejs/create-materialized-view.js
         :caption: create-materialized-view.js
         :language: javascript
         :linenos:
         :copyable:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create and update the view.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-materialized-view.js

         .. output::
            :visible: false

            Materialized view created!