.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst

   .. step:: Create the ``bedrock_db.test`` collection.

      a. Click the :guilabel:`+ Create Database` button. 
      #. For the :guilabel:`Database name` enter ``bedrock_db``.
      #. For the :guilabel:`Collection name`,  enter ``test``.
      #. Click :guilabel:`Create` to create the database and its 
         first collection.

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the {+avs+} index.

      This :ref:`vectorSearch <avs-types-vector-search>` type index definition 
      indexes the following fields: 
      
      - ``embedding`` field as the :ref:`vector
        <avs-types-vector-search>` type. The ``embedding`` field
        contains the vector embeddings created 
        using the embedding model that you specify when 
        you configure the knowledge base. The index definition 
        specifies ``1024`` vector dimensions and
        measures similarity using ``cosine``.

      - ``bedrock_metadata``, ``bedrock_text_chunk``, and 
        ``x-amz-bedrock-kb-document-page-number`` fields 
        as the :ref:`filter <avs-types-vector-search>` type for 
        pre-filtering your data. You will also specify these fields
        in {+aws-bedrock+} when you configure the knowledge base.

      .. note:: 
       
         If you previously created an index with the filter field ``page_number``, 
         you must update your index definition to use the new filter field name 
         ``x-amz-bedrock-kb-document-page-number`` instead. {+aws-bedrock+} has 
         updated the field name, and indexes using the old field name no longer 
         work correctly with {+aws-bedrock+} knowledge bases.

      .. tabs::

         .. tab:: Visual Editor 
            :tabid: vib 

            Specify |embedding-field-name| as the field to index and specify
            ``1024`` dimensions.

            .. include:: /includes/avs/extracts/steps-avs-index-filters.rst

         .. tab:: JSON Editor 
            :tabid: jsoneditor 

            Paste the following index definition in the JSON editor:

            .. code-block:: json 
               :copyable: true 
               :linenos: 

               {
                   "fields": [
                       {
                           "numDimensions": 1024,
                           "path": "embedding",
                           "similarity": "cosine",
                           "type": "vector"
                       },
                       {
                           "path": "bedrock_metadata",
                           "type": "filter"
                       },
                       {
                           "path": "bedrock_text_chunk",
                           "type": "filter"
                       },
                       {
                           "path": "x-amz-bedrock-kb-document-page-number",
                           "type": "filter"
                       }
                   ]
               }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/avs/index-examples/steps-avs-finish-index-creation.rst
