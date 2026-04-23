.. procedure:: 
   :style: normal

   .. step:: Install the MongoDB PHP Driver.

      For detailed installation instructions, see the
      :ref:`MongoDB PHP Library documentation <php-download-and-install>`.

   .. step:: Define the index.

      Create a file named ``vector-index.php``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/quick-start/code-snippets/php/basic-example.php
         :language: php
         :copyable: true
         :emphasize-lines: 6
         :caption: vector-index.php
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            php vector-index.php

         .. output:: /includes/quick-start/code-snippets/shell/create-index-output.sh
            :language: console
