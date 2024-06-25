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
   
   .. step:: Define the {+avs+} index.

      a. Click the :guilabel:`Create Search Index` button.
      #. Under :guilabel:`{+avs+}`, select :guilabel:`JSON Editor`  and
         then click :guilabel:`Next`.
      #. In the :guilabel:`Database and Collection` section, find the 
         ``bedrock_db`` database and select the ``test`` collection.
      #. In the :guilabel:`Index Name` field, enter
         ``vector_index``. 
      #. Replace the default definition with the following sample index
         definition and then click :guilabel:`Next`.

         This index definition specifies indexing the following fields
         in an index of the :ref:`vectorSearch
         <avs-types-vector-search>` type: 
         
         - ``embedding`` field as the :ref:`vector
           <avs-types-vector-search>` type. The ``embedding`` field
           contains the vector embeddings created 
           using the embedding model that you specify when 
           you configure the knowledge base. The index definition 
           specifies ``1536`` vector dimensions and
           measures similarity using ``cosine``.
         - The ``metadata`` and ``text_chunk`` fields 
           as :ref:`filter <avs-types-vector-search>` types for 
           pre-filtering your data. You specify these fields
           when you configure the knowledge base.

         .. code-block:: json 
            :copyable: true 
            :linenos: 

            {
                "fields": [
                    {
                        "numDimensions": 1536,
                        "path": "embedding",
                        "similarity": "cosine",
                        "type": "vector"
                    },
                    {
                        "path": "metadata",
                        "type": "filter"
                    },
                    {
                        "path": "text_chunk",
                        "type": "filter"
                    }
                ]
            }

   .. step:: Review the index definition and then click :guilabel:`Create Search Index`.

      A modal window displays to let you know that your index is building.

   .. step::  Click :guilabel:`Close` to close the :guilabel:`You're All Set!` modal window and wait for the index to finish building. 

      The index should take about one minute to build. While it
      builds, the :guilabel:`Status` column reads :guilabel:`Initial
      Sync`. When it finishes building, the :guilabel:`Status` column
      reads :guilabel:`Active`. 
