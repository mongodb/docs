.. procedure::
   :style: normal

   .. step:: Add the PyMongo Driver as a dependency in your project:

      .. code-block:: sh

         pip install pymongo

      For more detailed installation instructions, see the 
      `MongoDB Python Driver documentation <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/get-started/>`__.
   
   .. step:: Define your index in a new file.

      This example uses a file named ``vector-index.py`` with the following index definition:
      
      .. literalinclude:: /includes/search-in-community/basic-example.py
         :caption: vector-index.py
         :language: python
         :emphasize-lines: 6
         :linenos:
         :copyable:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.
         
   .. step:: Specify your connection string. 
      
      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create your index.

      For example, run the following command to create the index specified in
      ``vector-index.py``.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            python vector-index.py

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step::  Define your query in a new file.
      
      .. include:: /includes/search-in-community/fact-vs-quick-start-intro.rst

      This example uses a file named ``vector-search-quick-start.py`` with
      the following sample query: 

      .. literalinclude:: /includes/search-in-community/basic-query.py
         :language: python
         :emphasize-lines: 4
         :linenos:


      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your connection string. 
      
      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.
      
      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            python vector-search-quick-start.py
        
         .. output:: /includes/search-in-community/basic-query-python-output.js
            :language: js
            :linenos: 
