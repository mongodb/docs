Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst
    
.. procedure::
   :style: normal

   .. step:: Set up your application.

      To learn how to install the driver and configure your C application, see the
      `Get Started <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__
      tutorial in the MongoDB C Driver documentation.

   .. step:: Define the index.

      Create a ``create-static-index.c`` file in your application directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/synonyms/create-static-index.c
         :caption: create-static-index.c
         :language: c
         :linenos:
         :copyable:

   .. step:: Create the index.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target index.out
            ./cmake-build/index.out

         .. output::

            Index created!