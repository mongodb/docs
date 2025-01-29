.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Define the {+avs+} index.

      a. Click :guilabel:`Create Search Index`.
      #. Under :guilabel:`{+avs+}`, select :guilabel:`JSON Editor`  and
         then click :guilabel:`Next`.
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_mflix`` database, and select the ``embedded_movies``
         collection.
      #. In the :guilabel:`Index Name` field, enter
         ``vector_index``. 
      #. Replace the default definition with the following index
         definition and then click :guilabel:`Next`.

   .. step:: Define the {+avs+} index. 

      a. Replace the default definition with the following index definition.

         This index definition specifies indexing the following fields
         in an index of the :ref:`vectorSearch
         <avs-types-vector-search>` type: 
         
         - ``plot_embedding`` field as the :ref:`vector
           <avs-types-vector-search>` type. The ``plot_embedding`` field
           contains embeddings created using OpenAI's
           ``text-embedding-ada-002`` embedding model. The index
           definition specifies ``1536`` vector dimensions and
           measures similarity using ``dotProduct``. 
         - ``genres`` field as the :ref:`filter <avs-types-vector-search>`
           type for pre-filtering data by string values in the field.
         - ``year`` field as the :ref:`filter <avs-types-vector-search>`
           type for pre-filtering data by numeric values in the field.

         .. code-block:: json 
            :copyable: true 
            :linenos: 

            {
              "fields": [
                {
                  "type": "vector",
                  "path": "plot_embedding",
                  "numDimensions": 1536,
                  "similarity": "dotProduct",
                  "quantization": "scalar"
                },
                {
                  "type": "filter",
                  "path": "genres"
                },
                {
                  "type": "filter",
                  "path": "year"
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
