.. procedure::
   :style: normal

   .. step:: Add the MongoDB Node Driver as a dependency in your project.

      .. code-block:: sh

         npm install mongodb

      .. tip::
         
         The examples on this page assume your project manages modules as
         CommonJS modules. If you're using ES modules, instead, you must
         modify the import syntax.

   .. step:: Define your index in a new file.

      This example uses a file named ``vector-index.js`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.js
         :language: javascript
         :copyable: true
         :caption: vector-index.js
         :emphasize-lines: 4
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst
      
      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create your index.

      The following operation creates the index specified in
      ``vector-index.js``. 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            node vector-index.js

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step:: Define your query in a new file.
      
      This example uses a file named ``vector-search-quick-start.js`` with the
      following sample query: 

      .. literalinclude:: /includes/search-in-community/basic-query.js
         :language: js
         :emphasize-lines: 4
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the following command to query your collection with the query
      specified in ``vector-search-quick-start.js``. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node vector-search-quick-start.js

         .. output:: /includes/search-in-community/basic-query-nodejs-output.js
            :language: js
            :linenos: 

            

