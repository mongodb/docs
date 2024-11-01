.. procedure::
   :style: normal

   .. step:: Install the MongoDB PHP Driver.

      For detailed installation instructions, see the
      :ref:`MongoDB PHP Library documentation <php-download-and-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlas_vector_search_quick_start.php``.

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.php`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.php
            :language: php
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            php atlas_vector_search_quick_start.php

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js
            :language: js
            :linenos:
