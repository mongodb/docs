.. procedure:: 
   :style: normal 

   .. step:: In |service|, navigate to the :guilabel:`Database Deployments` page for your project.

      a. If it is not already displayed, select the organization that
         contains your desired project from the
         :guilabel:`Organizations` menu in the navigation bar.
      #. If it is not already displayed, select your desired project
         from the :guilabel:`Projects` menu in the navigation  bar.
      #. If the :guilabel:`Database Deployments` page is not already
         displayed, click :guilabel:`Database` in the sidebar. 

   .. step:: Go to the :guilabel:`Atlas Search` page for your {+cluster+}. 
      
      a. Click :guilabel:`Atlas Search` from the :guilabel:`Services` 
         menu in the navigation bar.
      #. Select the {+cluster+} from the :guilabel:`Select data source` 
         dropdown and click :guilabel:`Go to Atlas Search`.

   .. step:: Define the {+avs+} index.

      a. Click :guilabel:`Create Search Index`.
      #. Under :guilabel:`{+avs+}`, select :guilabel:`JSON Editor`  and
         then click :guilabel:`Next`.
      #. In the :guilabel:`Database and Collection` section, find the 
         ``langchain_db`` database, and select the ``test``
         collection.
      #. In the :guilabel:`Index Name` field, enter
         ``vector_index``. 
      #. Replace the default definition with the following index
         definition and then click :guilabel:`Next`.

         This index definition specifies indexing the following fields
         in an index of the :ref:`vectorSearch
         <avs-types-vector-search>` type: 
         
         - ``embedding`` field as the :ref:`vector
           <avs-types-vector-search>` type. The ``embedding`` field
           contains the embeddings created using OpenAI's
           ``text-embedding-ada-002`` embedding model. The index
           definition specifies ``1536`` vector dimensions and
           measures similarity using ``cosine``.
         - ``page`` field as the :ref:`filter <avs-types-vector-search>`
           type for pre-filtering data by the page number in the PDF.

         .. code-block:: json 
            :copyable: true 
            :linenos: 

            {
               "fields":[
                  {
                     "type": "vector",
                     "path": "embedding",
                     "numDimensions": 1536,
                     "similarity": "cosine"
                  },
                  {
                     "type": "filter",
                     "path": "page"
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
