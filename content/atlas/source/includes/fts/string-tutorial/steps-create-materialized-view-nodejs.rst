.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the materialized view.

      Create a new file in your project directory named
      ``create-materialized-view.js``, and copy and paste the following
      code into the file. 
      
      .. include:: /includes/fts/string-tutorial/fact-data-transformation.rst

      .. literalinclude:: /includes/fts/string-tutorial/create-materialized-view.js
         :caption: create-materialized-view.js
         :language: javascript
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create and update the view.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-materialized-view.js

         .. output::
            :visible: false

            Materialized view created!