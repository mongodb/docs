.. procedure:: 
   :style: normal 

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst
    
      a. Create a file named ``atlas-vector-search-quick-start.py``.

      #. Copy and paste the following sample query into the 
         ``atlas-vector-search-quick-start.py`` file:

         ..
            NOTE: If you edit this Python file, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/get-started/quick-start.ipynb

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query.py 
            :language: python
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

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
     
            python atlas-vector-search-quick-start.py
        
         .. output:: /includes/avs/pipeline-stage-examples/basic-query-python-output.js
            :language: js
            :linenos: 
