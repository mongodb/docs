.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``run-query.py``.

   .. step:: Copy and paste the following code into the ``run-query.py`` file.

      .. literalinclude:: /includes/avs/create-embeddings/automated/query.py
         :language: python
         :linenos:
         :emphasize-lines: 3
         :caption: run-query.py

   .. step:: Replace the ``<connection-string>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the following command to query your collection:
  
     .. io-code-block::
        :copyable: true

        .. input::
           :language: bash
     
           python run-query.py
        
        .. output:: /includes/avs/create-embeddings/automated/python-query-output.js
           :language: javascript
           :visible: false
           :linenos: