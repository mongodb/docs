a. Install the MongoDB PHP Driver.

   For detailed installation instructions, see the
   :ref:`MongoDB PHP Library documentation <php-download-and-install>`.

#. Define the index.

   Create a file named ``vector-index.php``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.php
      :language: php
      :copyable: true
      :emphasize-lines: 6
      :caption: vector-index.php
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the following command to create the index.

   .. io-code-block::
       :copyable: true 

       .. input:: 
          :language: shell 

          php vector-index.php

       .. output:: /includes/avs/index-management/create-index/create-index-output.sh
          :language: console
