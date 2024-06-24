.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Create an {+avs+} index.

      To create, click :guilabel:`Create Search Index`.

   .. step:: Select :guilabel:`JSON Editor` under :guilabel:`Atlas Vector Search` and click :guilabel:`Next`.

       .. figure:: /images/avs-create-index.png 
          :figwidth: 100%
          :alt: Screenshot of create Atlas Vector Search index 

   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.

      a. In the :guilabel:`Index Name` field, enter a name for the index.

         Index name must be unique within the namespace, regardless of
         the index type.

         .. example:: 

            Enter **vector_index** as the name for the example
            index. If you already have an index named *vector_index* on
            this collection, enter a different name for the index.

      #. In the :guilabel:`Database and Collection` section, find the 
         database, and select the collection.

         .. tip:: 

            If you navigated to this page from the :guilabel:`Data
            Explorer`, you can skip this step because |service|
            preselects the database and collection that you selected in
            the :guilabel:`Data Explorer`.

         .. example:: 

            In the :guilabel:`Database and Collection` section, find the
            ``sample_mflix`` database, and select the
            ``embedded_movies`` collection. 

   .. step:: Specify an index definition.

      An {+avs+} index resembles the following example: 

      .. code-block:: json
         :copyable: true 
         :linenos:

         {
           "fields":[ 
             {
               "type": "vector",
               "path": <field-to-index>,
               "numDimensions": <number-of-dimensions>,
               "similarity": "euclidean | cosine | dotProduct"
             },
             {
               "type": "filter",
               "path": "<field-to-index>"
             },
             ...
           ]
         }

      To learn more about the fields in the index, see
      :ref:`avs-types-vector-search`. 

      .. example:: 

         The following index definition indexes the ``plot_embedding``
         field as the ``vector`` type and the ``genres`` and ``year``
         fields as the ``filter`` type in an {+avs+} index. The
         ``plot_embedding`` field contains embeddings created using
         OpenAI's ``text-embedding-ada-002`` embeddings model. The
         index definition specifies ``1536`` vector dimensions and
         measures similarity using ``euclidean`` distance. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field for performing vector search.  

               .. code-block:: json 
                  :linenos:

                  {
                    "fields": [{
                      "type": "vector",
                      "path": "plot_embedding",
                      "numDimensions": 1536,
                      "similarity": "euclidean"
                    }]
                  }

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding``) for
                 performing vector search against pre-filtered data.

               .. code-block:: json 
                  :linenos:

                  {
                    "fields": [{
                      "type": "vector",
                      "path": "plot_embedding",
                      "numDimensions": 1536,
                      "similarity": "euclidean"
                    },
                    {
                      "type": "filter",
                      "path": "genres"
                    },
                    {
                      "type": "filter",
                      "path": "year"
                    }]
                  }

   .. step:: Click :guilabel:`Next` to review the index. 

   .. include:: /includes/steps-fts-finish-index-creation.rst
