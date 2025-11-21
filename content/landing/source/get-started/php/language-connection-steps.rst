.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Before you begin, ensure that you have the following
      dependencies installed:
      
      - :php:`PHP <install>` version 7.4 or later
      - `Composer <https://getcomposer.org/download/>`__ version 2.0 or later
      - :github:`pie </php/pie/blob/main/docs/usage.md>`

      Run the following commands in your shell to create a new
      directory and a file for your application. The command also
      installs the {+php-driver+}.

      .. tabs::

         .. tab:: macOS
            :tabId: macos

            .. code-block:: shell

               mkdir php-get-started
               cd php-get-started
               touch getstarted.php
               pie install mongodb/mongodb-extension
               composer require mongodb/mongodb

         .. tab:: Windows
            :tabId: windows

            .. code-block:: shell
            
               mkdir php-get-started
               cd php-get-started
               type nul > getstarted.php
               pie install mongodb/mongodb-extension
               composer require mongodb/mongodb

   .. step:: Create your application

      Copy and paste the following code into ``getstarted.php``. This code
      connects to your cluster and queries your sample data.

      .. literalinclude:: /shared/drivers-get-started/php/get-started-connect.php
         :language: php

   .. step:: Add your connection string

      .. include:: /get-started/includes/env-string-note.rst

   .. step:: Run your application

      In your project directory, run the following command to start
      the application:

      .. code-block:: shell

         php getstarted.php

      The application output contains details about the retrieved
      movie document:

      .. code-block:: none

         {
             "_id": {
                 "$oid": "..."
             },
             ...
            "rated": "R",
            "metacritic": 80,
            "title": "The Shawshank Redemption",
            ...
         }