.. procedure::
   :style: normal

   .. step:: Install the MongoDB PHP Driver.

      For detailed installation instructions, see the
      :ref:`MongoDB PHP Library documentation <php-download-and-install>`.

   .. step:: Define your index in a new file.

      This example uses a  named ``vector-index.php`` with the following index
      definition:

      .. literalinclude:: /includes/search-in-community/basic-example.php
         :language: php
         :copyable: true
         :emphasize-lines: 6
         :caption: vector-index.php
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create your index.

      For example, the following operation creates the index specified in
      ``vector-index.php``. 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            php vector-index.php

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step:: Define your query in a new file.

      This example uses a file named ``vector-search-quick-start.php`` with the
      following sample query: 

      .. literalinclude:: /includes/search-in-community/basic-query.php
         :language: php
         :copyable: true
         :emphasize-lines: 6
         :caption: vector-search-quick-start.php
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      The following command runs the query specified in
      ``vector-search-quick-start.php``.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            php vector-search-quick-start.php

         .. output:: /includes/search-in-community/basic-query-nodejs-output.js
            :language: js
            :linenos:

